# 🎖️ ShibWallet UIkit

[![Version](https://img.shields.io/npm/v/@obridge/uikit)](https://www.npmjs.com/package/@obridge/uikit) [![Size](https://img.shields.io/bundlephobia/min/@obridge/uikit)](https://www.npmjs.com/package/@obridge/uikit)

ShibWallet UIkit is a set of React components and hooks used to build pages on ShibWallet's apps. It also contains a theme file for dark and light mode.

## Install

`yarn add @obridge/uikit`

**\*Note**: In case you want to use the older version of the ShibWallet UIkit, you should install @obridge-libs/uikit, instead, but we recommend using the latest version of the UIkit.\*

## Setup

### Providers

Before using ShibWallet UIkit, you need to provide the theme file to uikit provider.

```
import { UIKitProvider, light, dark } from '@obridge/uikit'
...
<UIKitProvider theme={isDark ? dark : light}>...</UIKitProvider>
```

### Reset

A reset CSS is available as a global styled component.

```
import { ResetCSS } from '@obridge/uikit'
...
<ResetCSS />
```

### Types

This project is built with Typescript and export all the relevant types.

## How to use the UIkit

If you want to use components from the UIkit, check the [Storybook documentation](https://obridge.github.io/obridge-uikit/)
