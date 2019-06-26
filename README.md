[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## How to run

### install node.js

* 安装nvm，参考 [Node Version Manager](https://github.com/creationix/nvm)
* 使用nvm安装node.js: nvm install 10.7.0

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm install -g yarn
```

### clone and run
本项目包含依赖其他仓库，下载时请使用
```
git clone --recursive https://github.com/zeroslope/WeiboAnalysis.git
# 如果网络状况不好的话
cnpm install
yarn # 应该会有error
yarn # 再试一次
yarn start # 然后就可以跑了
```

### pack
```
yarn dist
```

## TODDs
- [x] standard
- [x] babel
- [x] parcel render process
- [x] parcel main/main.js