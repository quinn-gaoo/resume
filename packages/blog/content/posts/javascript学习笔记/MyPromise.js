const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

const runMicroTask = (task) => {
  // node 环境
  if (process.nextTick) {
    return process.nextTick(task);
  }
  // 浏览器环境
  if (window.queueMicrotask) {
    return window.queueMicrotask(task);
  }
  // 其他环境
  return setTimeout(task, 0);
};

const isLikePromise = (promise) => {
  return (
    promise && typeof promise === "object" && typeof promise.then === "function"
  );
};

const isPromise = (promise) => {
  return promise instanceof MyPromise;
};

class MyPromise {
  _state = PENDING;
  _value = undefined;
  #tasks = [];
  constructor(executor) {
    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  #changeState(state, value) {
    if (this._state !== PENDING) return;
    this._state = state;
    this._value = value;
    this.#runTasks();
  }
  _resolve(value) {
    this.#changeState(FULFILLED, value);
  }
  _reject(reason) {
    this.#changeState(REJECTED, reason);
  }

  #runTasks() {
    if (this._state === PENDING) return;

    while (this.#tasks[0]) {
      const task = this.#tasks.shift();
      this.#runOneTask(task);
    }
  }
  #runOneTask({ onFulfilled, onRejected, resolve, reject }) {
    runMicroTask(() => {
      let executor;
      if (this._state === FULFILLED) {
        executor = onFulfilled;
      } else if (this._state === REJECTED) {
        executor = onRejected;
      }

      if (typeof executor !== "function") {
        if (this._state === FULFILLED) {
          resolve(this._value);
        } else {
          reject(this._value);
        }
        return;
      }

      try {
        const result = executor(this._value);
        if (isLikePromise(result)) {
          result.then(resolve, reject);
        } else {
          if (this._state === FULFILLED) {
            resolve(result);
          } else {
            reject(result);
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#tasks.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#runTasks();
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  finally(onFinally) {
    return this.then(
      (data) => {
        onFinally();
        return data;
      },
      (err) => {
        onFinally();
        throw err;
      },
    );
  }
}

MyPromise.resolve = (reason) => {
  if (isPromise(data)) {
    return data;
  }
  return new MyPromise((resolve, reject) => {
    if (isLikePromise(data)) {
      data.then(resolve, reject);
    } else {
      resolve(data);
    }
  });
};
MyPromise.resolve = (data) => {
  if (isPromise(data)) {
    return data;
  }
  return new MyPromise((resolve, reject) => {
    if (isLikePromise(data)) {
      data.then(resolve, reject);
    } else {
      resolve(data);
    }
  });
};

// reject 比较特殊， 传入的
MyPromise.reject = (reason) => {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};

MyPromise.all = (promises) => {
  return new MyPromise((resolve, reject) => {
    const results = [];
    let count = 0;
    for (const promise of promises) {
      MyPromise.resolve(promise).then((data) => {
        results[count] = data;
        count++;
        if (count === promises.length) {
          resolve(results);
        }
      });
    }
  });
};

MyPromise.allSettled = (promises) => {
  return new MyPromise((resolve, reject) => {
    const results = [];
    let count = 0;
    for (const promise of promises) {
      MyPromise.resolve(promise).then(
        (data) => {
          results[count] = {
            status: "fulfilled",
            value: data,
          };
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        },
        (err) => {
          results[count] = {
            status: "rejected",
            reason: err,
          };
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        },
      );
    }
  });
};

MyPromise.race = (promises) => {
  return new MyPromise((resolve, reject) => {
    for (const promise of promises) {
      MyPromise.resolve(promise).then(resolve, reject);
    }
  });
};

{
  // 测试
  const resolveP = new MyPromise((resolve, reject) => {
    resolve(1);
  });
  const rejectP = new MyPromise((resolve, reject) => {
    reject(2);
  });
  const err = new Error("error");

  {
    const rejectThenEmptyP = rejectP.then();
    const resolveThenEmptyP = resolveP.then();

    setTimeout(() => {
      console.assert(
        resolveThenEmptyP._state === resolveP._state &&
          resolveThenEmptyP._value === resolveP._value &&
          rejectThenEmptyP._state === rejectP._state &&
          rejectThenEmptyP._value === rejectP._value,
        "5. then中不是一个函数,状态穿透",
        resolveThenEmptyP,
        rejectThenEmptyP,
      );
    }, 0);
  }

  {
    const thenErrorP = resolveP.then(() => {
      throw err;
    });
    const thenP = resolveP.then(() => 2);

    setTimeout(() => {
      console.assert(
        thenErrorP._state === REJECTED && thenErrorP._value === err,
        "6. then中报错",
      );
      console.assert(
        thenP._state === FULFILLED && thenP._value === 2,
        "6.1. then中返回值",
      );
    }, 0);
  }

  {
    const thenP = resolveP.then(() => {
      return new MyPromise((resolve, reject) => {
        resolve(2);
      });
    });
    setTimeout(() => {
      console.assert(
        thenP._state === FULFILLED && thenP._value === 2,
        "6.1. then中的onFulfilled函数 返回一个promise",
        thenP,
      );
    }, 0);
    const thenReturnRejectP = resolveP.then(() => {
      return new MyPromise((resolve, reject) => {
        reject(2);
      });
    });
    setTimeout(() => {
      console.assert(
        thenReturnRejectP._state === REJECTED && thenReturnRejectP._value === 2,
        "6.2. then中的onRejected函数 返回一个promise",
      );
    }, 0);
  }

  {
    // 互操作
    const thenReturnRejectP = resolveP.then(() => {
      return new Promise((resolve, reject) => {
        reject(2);
      });
    });
    setTimeout(() => {
      console.assert(
        thenReturnRejectP._state === REJECTED && thenReturnRejectP._value === 2,
        "7.1. then中的onRejected函数 返回一个promise",
        thenReturnRejectP,
      );
    }, 0);

    const thenReturnFulfilledP = resolveP.then(() => {
      return new Promise((resolve, reject) => {
        resolve(2);
      });
    });
    setTimeout(() => {
      console.assert(
        thenReturnFulfilledP._state === FULFILLED &&
          thenReturnFulfilledP._value === 2,
        "7.1. then中的onFulfilled函数 返回一个promise",
      );
    }, 0);

    const p = new Promise((resolve) => resolve(2))
      .then((res) => {
        return new MyPromise((resolve, reject) => {
          resolve(3);
        });
      })
      .then((res) => {
        console.assert(res === 3, "原生promise 的then中返回mypromise");
      });
  }

  {
    const p = MyPromise.resolve(1);
    setTimeout(() => {
      console.assert(
        p._state === FULFILLED && p._value === 1,
        "8. resolve 中返回值",
      );
    }, 0);
    const p1 = MyPromise.resolve({
      then(onFulfilled, onRejected) {
        onFulfilled(1);
      },
    });
    setTimeout(() => {
      console.assert(
        p1._state === FULFILLED && p1._value === 1,
        "8. resolve 中返回值",
      );
    }, 0);
  }
  {
    const p = MyPromise.reject(1);
    setTimeout(() => {
      console.assert(
        p._state === REJECTED && p._value === 1,
        "8. reject 中返回值",
      );
    }, 0);

    const thenable = {
      then(onFulfilled, onRejected) {
        onRejected(1);
      },
    };
    const p1 = MyPromise.reject(thenable);
    setTimeout(() => {
      console.assert(
        p1._state === REJECTED && p1._value === thenable,
        "8. reject 中返回值",
      );
    }, 0);
  }

  {
    MyPromise.all([1, MyPromise.resolve(2)]).then((res) => {
      console.assert(res.toString() === "1,2", "8. all 中返回值");
    });

    MyPromise.all([1, MyPromise.reject(2)]).catch((err) => {
      console.assert(err === 2, "8. all 中报错");
    });
  }

  {
    MyPromise.allSettled([1, MyPromise.resolve(2), rejectP]).then((res) => {
      console.assert(
        res[0].status === "fulfilled",
        res[0].value === 1 &&
          res[1].status === "fulfilled" &&
          res[1].value === 2 &&
          res[2].status === "rejected" &&
          res[2].reason === 2,
        "8. allSettled 中返回值",
        res,
      );
    });
  }

  {
    MyPromise.race([
      new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
      new MyPromise((resolve, reject) => setTimeout(() => resolve(2), 500)),
      new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 1000)),
    ]).then((res) => {
      console.assert(res === 2, "8. race 中返回值");
    });

    MyPromise.race([
      new MyPromise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
      new MyPromise((resolve, reject) => setTimeout(() => reject(2), 500)),
      new MyPromise((resolve, reject) => setTimeout(() => resolve(3), 1000)),
    ]).catch((err) => {
      console.assert(err === 2, "8. race 中报错");
    });
    // MyPromise.race([1, MyPromise.reject(2)]).catch((err) => {
    //   console.assert(err === 2, "8. race 中报错");
    // });
  }
}
