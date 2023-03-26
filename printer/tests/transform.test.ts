import { assert, test } from 'vitest'

import { type PostNode, preWalk, transformCatalog } from '../src/shared'

const exampleObj = {
  MatrixOne: [
    {
      主页: 'README.md',
    },
    {
      '关于 MatrixOne': [
        {
          'MatrixOne 简介': 'Overview/matrixone-introduction.md',
        },
        {
          'MatrixOne 功能列表': 'Overview/matrixone-feature-list.md',
        },
        {
          'MatrixOne 技术架构': 'Overview/matrixone-architecture-design.md',
        },
        {
          'MySQL 兼容性': 'Overview/mysql-compatibility.md',
        },
        {
          最新动态: 'Overview/whats-new.md',
        },
      ],
    },
    {
      快速开始: [
        {
          '单机部署 MatrixOne': [
            {
              '单机部署 MatrixOne 概述':
                'Get-Started/install-standalone-matrixone.md',
            },
            {
              '在 macOS 上部署': [
                {
                  使用源代码部署:
                    'Get-Started/install-on-macos/install-on-macos-method1.md',
                },
                {
                  使用二进制包部署:
                    'Get-Started/install-on-macos/install-on-macos-method2.md',
                },
                {
                  '使用 Docker 部署':
                    'Get-Started/install-on-macos/install-on-macos-method3.md',
                },
              ],
            },
            {
              '在 Linux 上部署': [
                {
                  使用源代码部署:
                    'Get-Started/install-on-linux/install-on-linux-method1.md',
                },
                {
                  使用二进制包部署:
                    'Get-Started/install-on-linux/install-on-linux-method2.md',
                },
                {
                  '使用 Docker 部署':
                    'Get-Started/install-on-linux/install-on-linux-method3.md',
                },
              ],
            },
          ],
        },
        { 'SQL 的基本操作': 'Get-Started/basic-sql.md' },
      ],
    },
  ],
}

const expected: PostNode[] = [
  {
    title: '主页',
    path: 'README.mdx',
    children: [],
  },
  {
    title: '关于 MatrixOne',
    path: '',
    children: [
      {
        title: 'MatrixOne 简介',
        path: 'Overview/matrixone-introduction.mdx',
        children: [],
      },
      {
        title: 'MatrixOne 功能列表',
        path: 'Overview/matrixone-feature-list.mdx',
        children: [],
      },
      {
        title: 'MatrixOne 技术架构',
        path: 'Overview/matrixone-architecture-design.mdx',
        children: [],
      },
      {
        title: 'MySQL 兼容性',
        path: 'Overview/mysql-compatibility.mdx',
        children: [],
      },
      {
        title: '最新动态',
        path: 'Overview/whats-new.mdx',
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
            path: 'Get-Started/install-standalone-matrixone.mdx',
            children: [],
          },
          {
            title: '在 macOS 上部署',
            path: '',
            children: [
              {
                title: '使用源代码部署',
                path: 'Get-Started/install-on-macos/install-on-macos-method1.mdx',
                children: [],
              },
              {
                title: '使用二进制包部署',
                path: 'Get-Started/install-on-macos/install-on-macos-method2.mdx',
                children: [],
              },
              {
                title: '使用 Docker 部署',
                path: 'Get-Started/install-on-macos/install-on-macos-method3.mdx',
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
                path: 'Get-Started/install-on-linux/install-on-linux-method1.mdx',
                children: [],
              },
              {
                title: '使用二进制包部署',
                path: 'Get-Started/install-on-linux/install-on-linux-method2.mdx',
                children: [],
              },
              {
                title: '使用 Docker 部署',
                path: 'Get-Started/install-on-linux/install-on-linux-method3.mdx',
                children: [],
              },
            ],
          },
        ],
      },
      {
        title: 'SQL 的基本操作',
        path: 'Get-Started/basic-sql.mdx',
        children: [],
      },
    ],
  },
]

test('Should generate the catalog', () => {
  const result = transformCatalog(exampleObj)

  assert.deepEqual(result, expected)
})

test('Should traverse the tree in preorder', () => {
  const result: string[] = []

  for (const node of expected) {
    preWalk(node, ({ title }) => result.push(title))
  }

  assert.deepEqual(result, [
    '主页',
    '关于 MatrixOne',
    'MatrixOne 简介',
    'MatrixOne 功能列表',
    'MatrixOne 技术架构',
    'MySQL 兼容性',
    '最新动态',
    '快速开始',
    '单机部署 MatrixOne',
    '单机部署 MatrixOne 概述',
    '在 macOS 上部署',
    '使用源代码部署',
    '使用二进制包部署',
    '使用 Docker 部署',
    '在 Linux 上部署',
    '使用源代码部署',
    '使用二进制包部署',
    '使用 Docker 部署',
    'SQL 的基本操作',
  ])
})
