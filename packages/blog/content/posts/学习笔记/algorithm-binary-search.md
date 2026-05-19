---
title: "二分查找算法详解"
date: "2025-05-11"
category: "学习笔记"
tags: ["算法", "二分查找", "LeetCode"]
description: "深入理解二分查找算法的原理、实现和应用场景。"
---

# 二分查找算法详解

## 什么是二分查找

**二分查找（Binary Search）** 是一种高效的搜索算法，适用于有序数组。

## 核心思想

每次将搜索范围缩小一半，直到找到目标元素或搜索范围为空。

## 时间复杂度

- **最优情况**：O(1) - 目标元素在中间
- **最坏情况**：O(log n) - 需要不断缩小范围

## 实现方式

### 方式一：递归实现

```javascript
function binarySearchRecursive(arr, target, left, right) {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) {
    return mid;
  } else if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}

const arr = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearchRecursive(arr, 7, 0, arr.length - 1)); // 3
```

### 方式二：迭代实现

```javascript
function binarySearchIterative(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

const arr = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearchIterative(arr, 9)); // 4
```

## 常见变形

### 查找第一个等于目标的元素

```javascript
function findFirstEqual(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1; // 继续向左查找
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

const arr = [1, 2, 2, 2, 3, 4];
console.log(findFirstEqual(arr, 2)); // 1
```

### 查找最后一个小于等于目标的元素

```javascript
function findLastLessOrEqual(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] <= target) {
      result = mid;
      left = mid + 1; // 继续向右查找
    } else {
      right = mid - 1;
    }
  }
  
  return result;
}

const arr = [1, 3, 5, 7, 9];
console.log(findLastLessOrEqual(arr, 6)); // 2
```

## 应用场景

1. **有序数组查找**：数据库索引、排序后的列表
2. **二分答案**：在可能的答案范围内二分查找
3. **边界查找**：寻找插入位置、上下界

## LeetCode推荐题目

- [704. Binary Search](https://leetcode.com/problems/binary-search/)
- [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)
- [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
- [153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

## 总结

二分查找是非常高效的搜索算法，但要求数组必须有序。掌握二分查找及其各种变形，对于解决算法问题非常有帮助。