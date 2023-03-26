import { assert, test } from 'vitest'

import { transformIndex } from '../src/shared'

test('Should generate the book index', () => {
  const exampleObj = {
    MatrixOne: [
      {
        主页: 'README.md',
      },
      {
        '关于 MatrixOne': [
          {
            'MatrixOne 简介': 'MatrixOne/Overview/matrixone-introduction.md',
          },
          {
            'MatrixOne 功能列表':
              'MatrixOne/Overview/matrixone-feature-list.md',
          },
          {
            'MatrixOne 技术架构':
              'MatrixOne/Overview/matrixone-architecture-design.md',
          },
          {
            'MySQL 兼容性': 'MatrixOne/Overview/mysql-compatibility.md',
          },
          {
            最新动态: 'MatrixOne/Overview/whats-new.md',
          },
        ],
      },
      {
        快速开始: [
          {
            '单机部署 MatrixOne': [
              {
                '单机部署 MatrixOne 概述':
                  'MatrixOne/Get-Started/install-standalone-matrixone.md',
              },
              {
                '在 macOS 上部署': [
                  {
                    使用源代码部署:
                      'MatrixOne/Get-Started/install-on-macos/install-on-macos-method1.md',
                  },
                  {
                    使用二进制包部署:
                      'MatrixOne/Get-Started/install-on-macos/install-on-macos-method2.md',
                  },
                  {
                    '使用 Docker 部署':
                      'MatrixOne/Get-Started/install-on-macos/install-on-macos-method3.md',
                  },
                ],
              },
              {
                '在 Linux 上部署': [
                  {
                    使用源代码部署:
                      'MatrixOne/Get-Started/install-on-linux/install-on-linux-method1.md',
                  },
                  {
                    使用二进制包部署:
                      'MatrixOne/Get-Started/install-on-linux/install-on-linux-method2.md',
                  },
                  {
                    '使用 Docker 部署':
                      'MatrixOne/Get-Started/install-on-linux/install-on-linux-method3.md',
                  },
                ],
              },
            ],
          },
          { 'SQL 的基本操作': 'MatrixOne/Get-Started/basic-sql.md' },
        ],
      },
    ],
  }

  const expected = [
    {
      title: '主页',
      path: 'README.md',
      children: [],
    },
    {
      title: '关于 MatrixOne',
      path: '',
      children: [
        {
          title: 'MatrixOne 简介',
          path: 'MatrixOne/Overview/matrixone-introduction.md',
          children: [],
        },
        {
          title: 'MatrixOne 功能列表',
          path: 'MatrixOne/Overview/matrixone-feature-list.md',
          children: [],
        },
        {
          title: 'MatrixOne 技术架构',
          path: 'MatrixOne/Overview/matrixone-architecture-design.md',
          children: [],
        },
        {
          title: 'MySQL 兼容性',
          path: 'MatrixOne/Overview/mysql-compatibility.md',
          children: [],
        },
        {
          title: '最新动态',
          path: 'MatrixOne/Overview/whats-new.md',
          children: [],
        },
      ],
    },
    {
      title: '快速开始',
      path: '',
      children: [
        {
          title: '单机部署 MatrixOne',
          path: '',
          children: [
            {
              title: '单机部署 MatrixOne 概述',
              path: 'MatrixOne/Get-Started/install-standalone-matrixone.md',
              children: [],
            },
            {
              title: '在 macOS 上部署',
              path: '',
              children: [
                {
                  title: '使用源代码部署',
                  path: 'MatrixOne/Get-Started/install-on-macos/install-on-macos-method1.md',
                  children: [],
                },
                {
                  title: '使用二进制包部署',
                  path: 'MatrixOne/Get-Started/install-on-macos/install-on-macos-method2.md',
                  children: [],
                },
                {
                  title: '使用 Docker 部署',
                  path: 'MatrixOne/Get-Started/install-on-macos/install-on-macos-method3.md',
                  children: [],
                },
              ],
            },
            {
              title: '在 Linux 上部署',
              path: '',
              children: [
                {
                  title: '使用源代码部署',
                  path: 'MatrixOne/Get-Started/install-on-linux/install-on-linux-method1.md',
                  children: [],
                },
                {
                  title: '使用二进制包部署',
                  path: 'MatrixOne/Get-Started/install-on-linux/install-on-linux-method2.md',
                  children: [],
                },
                {
                  title: '使用 Docker 部署',
                  path: 'MatrixOne/Get-Started/install-on-linux/install-on-linux-method3.md',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          title: 'SQL 的基本操作',
          path: 'MatrixOne/Get-Started/basic-sql.md',
          children: [],
        },
      ],
    },
  ]

  const result = transformIndex(exampleObj)

  assert.deepEqual(result, expected)
})
