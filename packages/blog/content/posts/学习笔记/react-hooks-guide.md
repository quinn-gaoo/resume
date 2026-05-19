---
title: "React Hooks完全指南"
date: "2025-05-12"
category: "学习笔记"
tags: ["React", "Hooks", "useState", "useEffect"]
description: "详细讲解React Hooks的使用方法和最佳实践。"
---

# React Hooks完全指南

## 什么是Hooks

Hooks是React 16.8引入的新特性，让函数组件可以使用状态和其他React特性。

## 常用Hooks

### useState - 状态管理

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### useEffect - 副作用处理

```jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // 异步获取用户数据
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };
    
    fetchUser();
    
    // 清理函数
    return () => {
      console.log('组件卸载或依赖变化');
    };
  }, [userId]); // 依赖数组
  
  if (!user) return <div>Loading...</div>;
  
  return <div>{user.name}</div>;
}
```

### useContext - 上下文传递

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemeButton />
    </ThemeContext.Provider>
  );
}

function ThemeButton() {
  const theme = useContext(ThemeContext);
  return <button theme={theme}>Click me</button>;
}
```

### useReducer - 复杂状态逻辑

```jsx
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
    </div>
  );
}
```

## Hooks规则

1. **只在函数组件顶层调用Hooks**
2. **不要在循环、条件或嵌套函数中调用**
3. **只在React函数组件或自定义Hooks中调用**

## 自定义Hooks

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setStoredValue];
}

// 使用自定义Hook
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

## 总结

Hooks让React函数组件功能更强大，代码更简洁。掌握常用Hooks和自定义Hooks的编写方法，能极大提升开发效率。