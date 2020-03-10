# markdown-editor

## 立ち上げ方
`client`と`server`で`node_modules`の必要なパッケージをインストールしておく。

1. 1つ目のシェルでmongoサーバを立ち上げる。

```shell
$ mongod --dbpath=[dbpath]
```

2. 2つ目のシェルでAPIサーバを立ち上げる
```shell
$ cd server
$ npm start
```

3. 3つ目のシェルでmongoを開いて以下のようにデータを追加
```shell
$ mongo
> use wiki
> db.documents.create({path: '/', parent: '/', children: [], text: '', tags: [], updated: ''})
```

4. 4つ目のシェルでクライアントを立ち上げ
```shell
$ cd client
$ npm start
```