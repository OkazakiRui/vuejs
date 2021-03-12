# Vue.js
## VueCLI
### Vueの基礎
#### 省略系
```
<a :href="プロパティ名">Google</a>
<a :[プロパティ名]="プロパティ名">Google</a>
```
v-bindは :属性名="属性中身"
```
<button @click="myAlert">アラート表示</button>
```
v-onは @イベント名
#### はじめた 21-01-23
```
new Vue()
```
Vueをインスタンスを宣言した。(Vue使うぞ、と言う意味)
```
new Vue({
    el: "#app"
})
```
elプロパティにターゲットを記述
```
new Vue({
    el: "#app",
    data: {
        プロパティ名:"HelloWorld!"
    }
})
```
Vueインスタンスはデータを持つことができる。
```
<p>{{プロパティ名}}</p>
```
データは {{}} で取り出すことができる。
```
<button v-on:イベント名="メソッド名">メッセージ反転</button>
```
v-on:click で メソッド を 動作させる
```
methods:{
    メソッド名: 関数
}
```
関数の処理では this を使うことで、el の持つプロパティを参照することができる。
関数は アロー関数不可

#### テンプレート構文
HTMLを書いているのではなく、あくまで Vue.js のテンプレート構文にしたがって書いている。
```
<p>{{number * 3}}</p>
```
{{}} の中身はjsと同じように書くことができる。
```
<p>{{ok ? "yes" : "no"}}</p>
```
三項演算子で書くこともできる。
```
<p>{{hello()}}</p>
```
関数を実行することもできる。

#### ディレクティブとは
Vuejsにおける特別な属性のこと
v- から始まる
[v-onのDOMイベント一覧](https://developer.mozilla.org/ja/docs/Web/Events)
```
<p v-text="プロパティ名"></p>
```
タグの中身を変更する。
```
<p v-once>{{プロパティ名}}</p>
```
一度のみ描画する。
messageの値が書き換えられても関係なし
```
<p v-html="プロパティ名"></p>
```
html 要素として描画
```
<a v-bind:href="プロパティ名">Google</a>
```
プロパティからURLなどを参照したいときに使う。
```
<a :href="プロパティ名">Google</a>
```
v-bindは省略できる。
```
<a :[プロパティ名]="プロパティ名">Google</a>
```
[]を用いることで 属性名 も変数を参照することができる。
```
<a v-bind="{href: プロパティ名,id:プロパティ名}">Twitter</a>
```
v-bind="{  }"
で中にオブジェクト形式で属性を書くことができる。
=を忘れずに
```
<a v-bind="オブジェクト">Yahoo!JP</a>
```
href等があるオブジェクトを参照することもできる。
```
<button v-on:click="プロパティ++">カウントアップ</button>
```
変数の計算はできる
```
<button v-on:click="メソッド">カウントアップ</button>
```
v-on：clickの値をメソッドにしたとき、~~引数を取らない場合は~~ () が必要ない
```
<p v-on:mousemove="changeMousePosition">マウスを乗せてください</p>
```
引数を取らなくても function(e){  } に自動でイベント情報が入る
```
<p v-on:copy="copyText($event, 'red')">この文章をコピーしてください</p>
```
Eventともう一つ引数を取りたい場合、引数のいずれか（順不同）に $event をつけるとOK!

#### イベント修飾子 ( .stop, .prevent )
```
stopMousePosition: function (e) {
  e.stopPropagation();
},
```
現在のイベントをストップすることができる。（先に読み込まれるので後のイベントが起動しないように伝えなくする。伝達を止める）
Propagationは伝える。
重なっていたりすると、重なっているものが複数起動する。（バブリング）
```
<span v-on:mousemove.stop>この上は反応しません。</span>
<span v-on:mousemove.stop="メソッド名">この上は反応しません。</span>
```
e.stopPropagation();をイベントの後に .stop と記述するだけで同じことが出来る。
```
stopSiteMove: function (e) {
    e.preventDefault();
}
```
e.preventDefault();でブラウザのデフォルトとしてある挙動を無効化する。
```
<a v-on:click.prevent href="リンク">Google</a>
```
.prevent で e.preventDefault(); と同義
```
<a v-on:click.prevent.stop href="リンク">Google</a>
<a v-on:click.stop.prevent href="リンク">Google</a>
```
prevent stop は続けて書くことで両方無効化する。
```
<a v-on:click.prevent v-on:mousemove.stop href="リンク">Google</a>
```
v-on は複数書くことも可能。

#### キー修飾子
```
<input type="text" v-on:keyup.enter="myAlert">
```
keyupだけだとキーボードから離した瞬間にイベントが起こる
.enter でEnterキーを押した時だけイベントが起きるようになる。
```
<input type="text" v-on:keyup.enter.space="myAlert">
```
.enter.space と繋げることもできる。
```
<button v-on:[buttonclick]="myAlert">アラート表示</button>
```
[]で包むことでプロパティを参照することができる。
[]で包む場合プロパティ名は大文字不可

#### 双方向バインディングを作成
データバインディングとは modelとテンプレート構文(HTML)で扱う値が結合されていると言うこと
modelとは プロパティのこと
今までは、テンプレート構文がモデルの値を取ることは出来たがテンプレート構文がモデルの値に干渉することは出来なかった。
```
<input type="text" v-model="プロパティ名">
```
inputで打ったtextがプロパティ名のvalueにリアタイで格納される。

#### 動的なデータを表現する。
computedプロパティを使う。（算出プロパティ）
dataは動的なプロパティを扱うことは出来ません。
あくまで初期値を入力するためだけです。
```
computed: {
    プロパティ名: function () {
      return this.プロパティ名 * 3;
}
```
computed dataを元に動的に変更する値を格納する場所
動的に変更するだけでプロパティなので return は必要。
```
<p>{{lessThanThreeComputed}}</p>
<p>{{lessThanThreeMethods()}}</p>
```
Computed と Methods は同じことが出来てしまう。
でも、Methods でやってはいけない。

#### {{ メソッド() }}が動くタイミング
テンプレート構文で {{メソッド()}}を記述すると、いつのタイミングで実行されているか？
それはテンプレートの中で値が代わり再描画されたタイミングで毎回実行される。
再描画とは、HTMLの見えてる部分が変更されたタイミングである。

それに比べて computed は参照先が変更された場合のみ実行されるので値を動的に変更するプロパティは computed が推奨。

#### ウォッチャを使ってデータが変わったときに処理をする。
computed と watch は似ている。
基本的にはcomputedを使用する。

computed はあくまでプロパティ。そもそもプロパティにメソッド等は入れたくない。
テンプレート構文の中に入れないと動作しない。

watchは非同期処理を書くことが多い。
computedでも書くことが出来るがreturnが同期処理のものなので推奨されない
```
watch: {
    clickCount: function () {
        var vm = this;
        setTimeout(function () {
            vm.clickCount = 0;
        }, 1000);
    },
},
```
非同期処理の中ではthisは使えないので
vmにthisの値を代入して扱う。
```
<button @click="countDown">-1</button>
<button @click="countDown()">-1</button>
<button @click="clickCount--">-1</button>
```
v-on:event で関数を扱う場合 "" の中はjsの処理をかけるので、
@click="メソッド名()" で実行される
@click="メソッド名" で実行されるのはVuejsの仕様
メソッドイベントハンドラーという
```
<p>{{lessThanThreeComputed}}</p>
<p>{{lessThanThreeMethods()}}</p>
```
{{  }} の中身はjsの処理を書くのでメソッドを書いた場合 実行の () がいる。

#### classを動的に変更する方法
1. class名を並べて true false を付けて管理する方法
2. 普通に動的に書いていく方法
```
<p :class="{red:true, 'bg-blue':false}">Hello</p>
```
オブジェクト方式にしてtrue, falseを書く
class名に - が用いられている場合は '' で文字と認識させる必要がある。
_はそのままで良い。
```
<p :class="{red:プロパティ名, 'bg-blue':!プロパティ名}">Hello</p>
```
booleanの値をプロパティ名に格納すると動的にできる。
プロパティ名の前に ! を付けると反転の意味なので false になる。
```
<button @click="isActive = !isActive">切り替え</button>
```
トグルスイッチが簡単に作れる
```
<p :class="[color,bg]">Hello</p>
<p :class="[color,{'bg-blue':isActive}]">Hello</p>

color: red
bg: "bg-blue"
```
配列として与えたいclassが格納されたプロパティを記述

#### styleを動的に変更する方法
1. オブジェクトとしてkeyを変更する方法。
2. オブジェクトをそのまま入れる方法
```
<p :style="{color: textColor, 'background-color': bgColor }">Hello</p>

textColor: "#ddd",
bgColor: "#333",
```
プロパティにstyleの値を格納しておき、valueとして置くことでプロパティを弄るとstyleを変更することができる。
```
<p :style="textStyleObject">Hello</p>

textStyleObject: {
  color: "#333",
  "background-color": "#ddd",
}
```
基本的にHTML側で処理等を書くのは好ましくないので プロパティ の objectにして入れる方が好ましい

#### 配列構文
objectがある上で配列を使うかの判断をする。
複数の styleObject を適用したいときに配列を使う。
```
<p :style="[baseStyleObject,textStyleObject]">Hello</p>

textStyleObject: {
  color: "#333",
  "background-color": "#ddd",
},
baseStyleObject: {
  "font-size": "24px",
  fontWeight: "bold",
},
```
[styleObject1, styleObject2]
とすると適用される。

objectのkeyになるstyleは
"font-size" kebabケース
fontSize camelケース
両方で記述可能。

#### 条件付きレンダリング
v-if　v-else v-else-if
```
<p v-if="プロパティ名">おっけー</p>
```
プロパティが true のとき DOMが生成される。
```
<p v-if="プロパティ名">おっけー</p>
<p v-else>のっと おっけー</p>
```
プロパティが false のとき DOMが生成される。
v-ifの真下に来ないと動作しない。
```
<p v-if="okData">OK!</p>
<p v-else-if="maybeOkData">Maybe OK!</p>
<p v-else>Not OK...</p>
```
上記参照。

#### Templateタグ
DOM生成されるときに一切表示されないもの
```
<template v-if="tempDOM">
    <p>はじめまして、</p>
    <p>岡崎流依です。</p>
    <p>よろしくお願いします。</p>
</template>
```
templateで囲って v-if するとレンダリング処理を切り替えることができる。
divを使う必要がない！

#### v-show
falseの場合でも要素が存在し、ただ display : none; しているだけ
template に v-show を付けてもそもそもDOMが生成されないので display:none では中の要素は消えない。
templateが使えない
v-elseが使えない
初期描画が遅い
**頻繁に切り替えることが多い場合はv-show**
**条件が実行時に変わらない場合は v-if**
```
<div v-show="showDOM">
  <p>hope</p>
  <p>ミスター・ブルースカイ</p>
  <p>生きるをする</p>
</div>
```
一斉に消したい場合は div 等で囲わないとだめ

#### リストレンダリング
##### for in
```
<li v-for="fruit in fruits">{{fruit}}</li>
<li v-for="変数名 in 配列名">{{変数名}}</li>
```
配列の中身を変数名に代入することができる。
配列名 : 複数形, 
変数名 : 単数形
にすることが多い
```
<li v-for="fruit,index in fruits">({{index}}){{fruit}}</li>
```
第二引数でindexを取ることができる。
```
<li v-for="(value,key,index) in userObject">[{{index}}]{{key}} : {{value}}</li>
```
objectでも同じことができる。
value, key, index
```
<template v-for="fruit in fruits">
  <li>{{fruit}}</li>
  <hr>
</template>
```
v-for 要素を付けたタグ(中身も)を 配列 or オブジェクト の length分回す。
v-for で要素を回すときはtemplateがおすすめ
```
<li v-for="n in 10">{{n}}</li>
```
length分回すということは数字でも代用できる。
だが、定数では代用不可

##### for of
```
<li v-for="n of 3">{{n}}</li>
```
in を of に書き換えることができる。
Vue の書き方は in
JavaScript の書き方は of

##### v-forの仕様
要素の移動を最低限に抑えるアルゴリズムを使用し、可能な限り同じタイプの要素を再利用する。

**v-for を使うときは 必ず key属性 をつける**
```
<div v-for="fruit in fruits">
  <p>{{fruit}}</p>
  <input type="text">
</div>
<button @click="fruitsRemove">先頭を削除する</button>
```
実際行われる描画は、
fruitは上から消え、inputは下から消える。
<input type="text">
は全てが同じなので下から消える。
```
<div v-for="fruit in fruits" :key="fruit">
```
v-bind で key属性に fruit を入れる
templateは使えない => DOMとして生成されないから属性付与されない
fruit
```
<div v-for="fruit in fruits" :key="index">
```
key属性に index を入れてしまうと、this.fruits.shift();
によって先頭の値が消えてしまうので、index の値が変わってしまう。

fruits を object にして
fruitName : "ばなな"
fruitId : 1
みたいな管理をすると良い

### Vueインスタンスの内部構造
#### Vueインスタンスは複数作れるのか
作れる。
が基本的に複数のインスタンスを作るのはよくない
完全に独立している場合は良い

#### 外側からVueインスタンスにアクセスする方法
    const vm = new Vue({
      el: "#app1",
      data: {
        message: "インスタンス1",
      },
    });

    vm.message = "変更済み";

変数、定数に置くことで参照することができる。
vm は ViewModel の略称。

    vm1.name = "岡崎流依";
外部からプロパティを追加した場合追加したプロパティは **リアクティブ** にならない
リアクティブとは Vueインスタンスの値が変更されると 対になってwebの情報も変更されない状態のこと

リアクティブにしたいものは初めにプロパティとして追加しておく必要がある。
##### リアクティブシステムの仕組み
Vuejs は Vueインスタンス が作成されたときに全てのプロパティを観覧する。
ゲッター と セッター を付与する。

ゲッターとは
その変数が参照されたとき関数を実行する。

セッターとは
~~実行したい関数を書く場所がセッター~~
ゲッターが参照する変数の場所をセッターという

二つ合わせて ウォッチャー という
ウォッチャーの仕事はいろいろあり、変数の値が書き変わると再描画する。等の処理がそう。

    vm1.name = "岡崎流依";
後に追加した場合はゲッターとセッターがVueによって生成されないので、再描画されない。

    const vm1 = new Vue({
      el: "#app1",
      data: {
        name: "",
      },
    });
後から値を入れたい場合は空のプロパティを作成するのがおすすめ。

#### 自分トラブルシューティング
    changePage: function (before, after) {
      this.header[before] = false;
      this.main[before] = false;
      this.footer[before].select = false;

      this.header[after] = true;
      this.main[after] = true;
      this.footer[after].select = true;
    }
引数の値をプロパティで掘るにはブラケット記法でないとだめ
(値が正しく参照されないため)

#### ダラーマウント $mount
あとからappを指定したい場合は new Vue()を定数にして、
定数.$mount("#app") とすると良い
elは描かずとも指定ができる。

    new Vue({
      data: {
        name: "おかざき",
      },
    }).$mount("#app2");
のように最後に記述する方法もある。定数として取る必要がない。

#### VuejsでDOMを作る方法
    <p>{{message}}</p>
と指定するほかに2通りの方法がある。
templateプロパティ、render関数の2通り

##### templateプロパティで表示する方法
    template: "<h1>こんにちは、{{name}}</h1>",
data や computed のように template を宣言し、その中身を文章としてHTMLをそのまま記述する。
1つの文字列として記述する必要があるので、複数行は不向き

##### render関数で記述する方法
    render: function () {},
templateプロパティのように render もプロパティとして存在する。
render関数は名前の通り、値は関数を入力する。

    render: function (createElement) {
    return createElement()
    },
    
render関数には createElement という引数を取る必要がある。
そして戻り値は createElement というのを返さなくてはならない

createElement は メソッドなので、戻り値のとき実行させる。
createElement は引数を取ることができる。

    createElement("タグ","中に書きたいものを記述する。");
    createElement("h1", "こんにちは、" + this.name);
    
#### 仮想DOM と render関数

素のJavaScriptには
```
    document.createElement("div")
```
という関数が用意されている。

これは直接DOM要素を作成している。
DOM とは Document Object Model
document とはブラウザが html を受け取ってobjectに変換する

document というオブジェクトがある。そこに追加されるイメージ

今回render関数で扱うものとは全くの別物。

    render: function (なんでも良い) {
    return なんでも良い()
    },
    
render関数の引数はcreateElementでなくても良い

そしてよく使われるのが

    render: function (h) {
    return h("h1","こんにちは")
    },

hがよく使われる。
仮想DOMを使うときによく使う。

render の h は実際はなんなのか...
VNode という名前のオブジェクトが出てくる。
VNode は別の言い方で 仮想Node という。

document.createElement は DOM を作っている。
console.log では DOM が表示される。

render関数の VNode は DOM を作っていない。
console.log では Object が表示される。

VNode を実際に反映しているのはまた別の場所

    <h1>{{name}}</h1> 
や template 等は
render関数に変換されている！

### 仮想DOM
#### 仮想DOMとは
DOM要素を模したJavaScriptのObjectである。

querySelector や getElementById や createElement など
DOMに直接アクセスするのは遅い。パフォーマンスが落ちる。

DOMの文章だけを変更するときどうすれば効率よく変更するには、
文章だけを変更させれば効率的

仮想DOMはobjectなので作る前にobject同士の変更点だけを見る
すると効率がよく作成できる。

$mount は 作った仮想DOMを実際のDOMに変換させる。
updateするときも使うが、最初DOMを作るときも作用する。

#### Vueインスタンスライフサイクル
※インスタンスは初期化。

new Vue()
// なにも作られてない

↓ beforeCreate()

インスタンスが作られる。
// データがリアクティブになる。
// data や computed にアクセスできるようになる。

↓ created()

elがあるか

あった場合
template を render関数にコンパイル
templateプロパティやHTMLに直接書いているものを全てrenderにコンパイルする。

なかった場合
vm.$mount()が呼ばれたとき

↓ beforeMount()
// render関数 は VNode が入っているので、それを beforeMount() でDOMに変換している

VNodeで実際のDOMを作る → $el を作って実際のDOMに追加している。
vm.$el でアクセスすると実際のDOM要素が見れた (入ってる)

↓ mounted()
// 作ったDOMをそのまま $mount の場所へ当てはめる

Mounted.

↓

データが変わった

↓ beforeUpdate()
// 実際のDOMなどは作っていない。手前の段階。

DOMを再描画

↓ updated()

Mounted.



Mounted.

↓ beforeDestroy()

Destroyed

↓

destroyed()

の流れ


destroyed の方法は
    
    this.$destroy();

とするとインスタンスが削除される。
Vuejsのロジックが破棄される

### コンポーネント
コンポーネントを使用すると同じようなインスタンスを使い回すことができる。

    el:" 中身 "
elの中身は class や tag でもいける。 querySelector と同じ

    -HTML-
    <div class="hello"></div>
    <div class="hello"></div>
    <div class="hello"></div>

    -JavaScript-
    new Vue({
      el: ".hello",
      template: "<p>こんにちは</p>",
    });

elプロパティは一番最初に見つけたものだけを適用する。
（querySelector みたいな感じ）
なので表示されるのは一番上の要素だけ


そう言うときにコンポーネントという概念を使う。

#### 実際の使い方
    Vue.component("名前", {
        Vueインスタンスと同じようなものを取る
    });
// コンポーネントを取ることができる

    Vue.component("hello", {
        template: "<p>こんにちは</p>"
    });

これで hello という名前のコンポーネントが登録出来たことになる。
コンポーネントは js の定数・変数と同じで使うなら先に宣言する必要がある。

上で宣言し、Vueインスタンスされている中に
コンポーネント名のタグを作ると反映される

    <aisatu></aisatu>

### Vue CLI
#### Vue CLI とは
ファイルの分割ができる。
最終的なコードの軽量化。（改行や空白やコメントを削除する）
Babel, TypeScript, ESLint などのプラグインの使用ができる。
HMR(Hot Mdule Replacement) (コードを保存するだけで自動で差分を更新してくれる)
.vue, TS, SCSS, Pug, ES6 などの使用ができる。

いろいろ使用することができる。

#### Vue CLI のインストール
コマンドライン
npm (node package manager) の略称

    npm install -g @vue/cli
vue3 をグローバルにインストールする
vue1 や vue2 インストールする場合は名前ごと変わる。

    vue create study-vuejs
でプロジェクト？を作成する。

Yarn はfacebookが作ったパッケージマネージャー

    ur connection to the default yarn registry seems to be slow. use http://registry.npm.taobao.org for faster installation(Y/n)
    
これは中国からインストールするとファイヤーウォールに弾かれるので別リンクからダウンロードしますか？　という意味
もちろん n で良い

#### プロジェクトファイルの中身
babel → ES6のコードをES5にトランスパイルするためのもの
ES6が対応してないブラウザもあるので、最終的に公開するファイルはES5にする。

public → 静的ファイルを配置する場所
webpack → srcの中身が適応されてる

webpackは自動的に最適化してくれるもの
minify等が当てはまる

基本的にはpublicには何も置かない。

    "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
    },
npm ___ はscriptの中のkeyのこと
valueを実行しているのと同じ意味

    index.htmlにはbuilt files will be auto injected
と書いてある通り、builtすると自動でファイル等が追加されて良い感じになる。

assetsフォルダはcssファイル, imgファイルが入る。
componentsフォルダはコンポーネントを置く場所

基本的にmain.jsがindex.htmlに読み込まれる。
※自分でscriptを書く必要はない

builtするとsrcフォルダの中身のものをmain.jsに書き込まれていくイメージ

#### .vueファイル(単一ファイルコンポーネント) と main.js
main.jsの

    import Vue from 'vue'
はvueを読み込んでいるのでこれ以降はvueが使えますよと言う意味

    Vue.config.productionTip = false
consoleにてヘルプを表示するかどうかを決めれる。対して必要がないのでfalse

    render: h => h(App),
以前は createElement("タグ", "中身")という書き方をしていた

render関数の第一引数はオブジェクトを取ることができる。
でもなんでもは入らない。入るのは

    {
      data:{},
      computed:{},
      methods:{}
    }
とかのオブジェクトだけ。それ以外は入らない。

#### シングルファイルコンポーネント
シングルファイルコンポーネントは3つの構成で出来ている。

    template
    script
    style
で構成されている。

npm run build
を実行するとdistフォルダが出来て、最適化された状態のファイルが入る

    <script src="/js/chunk-vendors.28d0d835.js"></script>
    <script src="/js/app.3a0e622f.js"></script>
dist/index.html に chunk-vendors というのが読み込まれている。
これはnode_modulesの読み込み的な役割を果たす

vuejsはサーバー側で基本的には動かず、サーバーはdistフォルダを渡しているだけである。
開発段階でnpm run serveでlocalhostする意味は（自分のパソコンでサーバーを立てる）、
index直開きだとfileプロトコルになってしまうが、サーバーを経由することによって、httpプロトコルで動かすことができるのでより本番環境に近い形で開発することができる。

### コンポーネント
vueインスタンスを再利用するために扱われる

vueインスタンスはel(1つ目)のみを対象とする。

それぞれのコンポーネントにはデータを持っている。

#### コンポーネントの作り方 その1
    Vue.component("my-component",{
        data:{},
    })
    
    Vue.component("コンポーネント名",{内容？})
Vue.component();で作成可能。

    Vue.component("my-component",{
        data:{
            number:12
        },
        template:"<p>いいね({{number}})</p>"
    })
実行結果： いいね()
数字が表示されていない →
コンポーネント内でdataを使うには、関数にする必要がある。
戻り値にdataオブジェクトを返す必要がある。

    Vue.component("my-component", {
      data: function() {
        return {
          number: 12
        }
      },
      template: "<p>いいね({{number}})</p>"
    })
実行結果： いいね(12)
dataのnumber:12が戻り値にある。

##### コンポーネントのdataはどうして関数でなくてはならないのか
もしコンポーネントのdataを関数にしなかったら
参照してしまうからだめ。
つまり、同じデータを共有してしまうから。

同じ参照先というのは具体的に言うと、btn等で数を増やす仕組みを作ったと仮定する。
数が3つ増えると、元の参照先の値が増えてしまうのだ。

Vuejsは computed や methods であっても同じメモリを参照してしまう。
基本的には良いがdataの場合は別々に持つ必要がある。
なのでデータは基本的に関数にしてね。

返す値はそのコンポーネントの初期値を返してね。


#### コンポーネントの作り方 その2
特定のインスタンスのみに使えるコンポーネントがある。
さっき作ったのは、グローバル登録 という。
グローバル登録はVueインスタンスを別々に置いてもどこでも使えるのが特徴
今回作るのは、ローカル登録。

    var component = {
      data: function() {
        return {
          number: 12
        }
      },
      template: '<p>{{number}}<button @click="number++">+1</button></p>'
    }
コンポーネントの変数を作る。 

    new Vue({
      el: "#app",
      components: {
        "my-component": component
      }
    })
インスタンス化するときに、
components
というのがある。

componentsはobjectで情報を渡してあげる。
keyにelの中で使う時のコンポーネントの名前。
valueに変数

#### まとめると
グローバルコンポーネントは

    Vue.componen('コンポーネント名'{
        data:{},
        template:{}
    })
で作成する。

ローカルコンポーネントは

    var comp = {
        data:{},
        template:{}
    }
    
    new Vue({
        el:'',
        components:{
            "使うコンポーネント名" : comp
        }
    })
    
で作成する。

#### グローバルコンポーネントはあまり使用されない
グローバルコンポーネントはあまり使用されないコンポーネントなのにファイルに残ってしまって、最終的なファイルサイズが大きくなったりするため。

### 実際の動作環境の話
.vue ファイルは vuecli の中だから使えてる。
詳しく言うと vuecliの中でwebpackが使われていて、vueLoaderというのが読み込んで最終的にコンポーネントのオブジェクトの形になる。

App.vue をインポートすると、最終的に**コンポーネントのオブジェクト**になる

    export default {
      name: 'App',
      components: {
        HelloWorld
      }
    }
今までは

      components: {
        'HelloWorld' : HelloWorld
      }
だったが、ES6の書き方で

      components: {
        HelloWorld
      }

のように書くことができる。

    new Vue({
      render: (h) => h(App),
    }).$mount("#app");
render関数はサブとして、

    new Vue({
      render: (h) => h({
        render,methods等が入る。
      }),
    }).$mount("#app");
ので単一コンポーネントファイルはオブジェクトになっているので使うことができる、

#### 基本的な書き方
vueファイルの基本的な書き方は

template
script
style

の3に分けられていて、
script の中に
exportを作ってVueインスタンスのときに使っていたオブジェクトの中身（コンポーネントオプション）を記入する。

コンポーネントオプション
→ methods や data computed が入っているもの

    <template> </template>

    <script>
    export default {};
    </script>

    <style></style>
これが書き方の例。

      data: function() {
        return {};
      },
これがES5の今までの書き方

      data() {
        return {};
      },
ES6で書いた場合
babelが入っているのでES6の書き方ができる。

### ///////////////////////////////ep80

    Vue.component("like", likeNum);
グローバル登録しているので、全ての場所でコンポーネントを使用することができる。

1つのdivで括る必要がある。


    likeHeader,
    likeHeader: likeHeader,
ES6では両サイドが同じ値の場合は短縮して書くことができる。

### ローカル登録。
vueファイルで import
### グローバル登録。
main.js で Vue.component()

### コンポーネントの命名規則
ケバブケース、パスカルケースにする。
ケバブケース　：like-num
パスカルケース：LikeNum
キャメルケース：likeNum

キャメルケースは使わない

基本的にパスカルケースの方が良い
htmlの要素はケバブケースで書かれるのでパスカルケースの方が良い

DOMテンプレートではケバブケースを使用する。
HTMLの中で

    <button v-html="like-number"></>
とする。

@vue/cliは JS → HTML という順番で読み込むので大文字小文字の区別をつけることができる。

直接書いた場合は HTML → JS という順番になるので大文字小文字の区別がつけれない

### style
style scoped

DOMをカプセル化するのを シャドーDOMという

### 親子間でデータを取引する方法
#### 親から子に渡す方法 props
プロパティのことをpropsという

子のコンポーネントオプションに

    props: ["number"],
propsを作成し、配列で渡してあげる。

親の単一コンポーネントの属性に先ほど設定したnumberを書く。

    <likeNum :number="number"></likeNum>
    <likeNum number="6"></likeNum>
v-bind で動的なものにできる。

    props: ["totalNumber"],
propsはキャメルケース

    <likeNum :total-number="number"></likeNum>
属性はケバブケースで書く方が良い。
HTMLの属性なので。

propsのデータにアクセスする場合は、

      return this.totalNumber / 2;
でアクセスできる。

propsはobjectでも指定することができる。

      props: {
        totalNumber: String,
      },
objectで指定した場合は、型を定義する必要がある。
StringでNumberのものを受け取ったとき、警告がでる。
型指定することをバリデーションという。

    totalNumber: {
      type: Number,
      repuired: true,
    },
型意外にも、objectで指定することで
type = 型
required = 親から値を受け取る必要があるかどうか、
default = 親から受け取らなかった場合の値。

      default: 20,
      
      default: function(){
        return []
        return {}
      },
受け取る値がobjや配列の場合は関数にして返す必要がある。

#### 子から親に渡す方法
$emitメソッドで受け渡す。

propsはデータの受け口
送り口を作る必要がある。

$emit は 子コンポーネントで好きなタイミングで親のイベントを発火することができる。
データを入れるのは必須ではない。
データを入れた場合は $event の中に格納される。

    plusNum() {
      this.$emit("my-click", this.totalNumber + 1);
      // this.$emit(データ名, データを入れることができる。);
    },
子にthis.$emit で

    <likeNum :total-number="number" v-on:my-click="number = $event"></likeNum>
v-on:my-click="number = $event"
$eventの中にさっき入れたデータが入っている。

つまり、

    resetNum() {
      this.$emit("my-click");
    },

    <likeNum :total-number="number" v-on:my-click="number = 0"></likeNum>

とすることで、resetNumが動作したとき、親にあるmy-clickというのが動作する。
つまり、resetNum動作したとき number = 0 が動作する。

$emit はカスタムイベントを作成することができる。
this.$emit("my-click");
my-clickはカスタムイベント名という。

v-onなので @my-click でもかける。

    <likeNum
      :total-number="number"
      test-props="いけてる"
      @my-click="plus"
    ></likeNum>
    
    methods: {
      plus(value) {
        this.number = value;
      },
    },

methodsも動作することができる。
送ったデータをmethodsで使うには第一引数を指定することで扱うことができる。

propsでobjectと配列を受け取ると参照渡しになる。

カスタムイベントを作成するときはケバブケースが良い

### 親コンポーネントでHTMLごと子に渡してあげたい。
    <likeHeader headerText="トータルのいいね数"></likeHeader>
    <h2>{{ number }}</h2>
と書いた場合、HTMLタグを送るのは大変。

    <likeHeader>
      <h1>トータルのいいね数</h1>
      <h2>{{ number }}</h2>
    </likeHeader>
のように記述し、

    <template>
      <div>
        <slot></slot>
      </div>
    </template>
とすることでslotの中に入れることができる。

propsはデータ(string)等、slotはHTMLのテンプレートを送ることができる。

    <likeHeader>
      <h1>トータルのいいね数</h1>
      <h2>{{ number }}</h2>
    </likeHeader>
のスコープはあくまで記述した場所、 (今回の場合はApp.vue)のみ。
cssの場合はどちらでも良い。(入れ替わるため)

    <template>
      <div>
        <slot>デフォルトのタイトル</slot>
      </div>
    </template>
likeHeaderの中に何もないが、slotタグがある場合。
slotタグの中にある文字が表示される。
表示される物をフォールバックコンテンツという

### 名前つきslot
親コンポーネントから複数のHTMLデータを送りたいときに便利

      <template v-slot:title>
        <h1>トータルのいいね数</h1>
      </template>

    <slot name="title"></slot>
templateで囲う必要がある。

#### default slot
      <template v-slot:title>
        <h1>トータルのいいね数</h1>
      </template>
      <h3>はじめまして</h3>

    <slot name="title"></slot>
    <slot></slot>

templateの外に書いたものはdefault slotとして扱われる。
子コンポーネントファイルでnameのないslotを書くことで格納される。

      <template v-slot:number>
        <p>{{ number }}</p>
      </template>
は

      <template #:number>
        <p>{{ number }}</p>
      </template>
に置き換えることができる。

### 動的コンポーネント
    <component :is="currentComponent"></component>
    <Home v-if="currentComponent === 'Home'"></Home>
    <About v-if="currentComponent === 'About'"></About>
これだけ！
でも切り替えるときに destroy されている

destroyしてほしくないものは

    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
keep-aliveで囲う。

    export default {
      deactivated() {
        console.log("deactivated");
      },
      activated() {
        console.log("acrivated");
      },
アクティブになったとき、アクティブでなくなったときに処理をつけれる。
created, destroyed はkeep-aliveのとき行われないので activated 等を使う必要がある。

### v-model
v-model.lazy → フォーカスが外れたときに適用させる。
v-model.number → 型をnumberにしてくれる

      <EventTitle v-model="eventDate.title"></EventTitle>
                            or
      <EventTitle
        :value="eventDate.title"
        @input="eventDate.title = $event"
      ></EventTitle>

    <input
      type="text"
      id="title"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />

### カスタムディレクティブ v-??
コードを再利用したい。

    <p v-border>Home</p>
    Vue.directive("border", {});
directive の第一引数は v-の先の名前を書く。
第二引数はオブジェクトを取り、5つの関数を用意することができる。

    Vue.directive("border", {
      bind() {},
      inserted() {},
      update() {},
      componentUpdated() {},
      unbind() {},
    });
最低bindがあれば良い

  bind(el, binding, vnode) {
    // ディレクティブが初めて要素と結びついたとき
    // 一回目だけ
  },
  inserted(el, binding, vnode) {
    // 親Nodeに挿入されたとき
    // mounted のような感じ
  },
  update(el, binding, vnode, oldVnode) {
    // コンポーネントが更新されるたび。子コンポーネントが更新される前。
    // 仮想DOMの時に変更があった場合動作する
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    // コンポーネントが更新されるたび。子コンポーネントが更新される後。
  },
  unbind(el, binding, vnode) {
    // ディレクティブが紐ついている要素から取り除かれたとき
  },
  
bind と update はよく使う。
bind と update は基本ほとんど同じコードを書く、。

    Vue.directive("border", (el, binding) => {});
objectではなく、関数を書くとbind, updateに適応される
el は element
document.getElementById で とってきたのと同じ。

    el.style.border = "solid black 2px";
v-?? = "";
で渡したいものがある場合

    el.style.border = "solid 2px " + binding.value;
で取得可能。
複数渡すときは

    <p v-border="{ color: 'red', width: '7px' }">Home</p>
    
    el.style.borderWidth = binding.value.width;
    el.style.borderColor = binding.value.color;
みたいな感じにする。

#### ディレクティブの引数
v-??:引数
引数は1つまで
binding.arg

#### 修飾子
v-??引数.??.??

    if (binding.modifiers.round) {}
binding.modifiers.??
であるかどうかの判断ができる。
これはtrue falseが入っている。

#### ローカルに作る方法

### フィルター
テキストをフォーマットする。
大文字にする。小文字にする。というのができる。

    title: "Welcome To TDL",
    subTitle: "Welcome To TDS",
      
    computed: {
    upperCaseTitle() {
      return this.title.toUpperCase();
    },
    upperCaseSubTitle() {
      return this.subTitle.toUpperCase();
    },
    },
これでtitleもsubTitleも大文字になる。

    Vue.filter("upperCase", (string) => string.toUpperCase());

    <h2>{{ title | upperCase }}</h2>
    <h3>{{ subTitle | upperCase }}</h3>
パイプラインの右側に適応したいフィルターを書くだけ。

filter では this が使えないのでcomputed, methodsを使うと良い

filterはコンポーネントが再描画される度に実行される。
methodsと同じ。
### ミックスイン
似ているオプションが複数のコンポーネントで存在したときそれを共有化するもの

mixinsを使う場合は共有化したいオプションを js ファイルに記述する。

    export const tokyoNumber = {
      data() {
        return {
          title: "Welcome To TDL",
          subTitle: "Welcome To TDS",
          number: 0,
        };
      },
    };
今回は src 直下に tokyoNumber.js を作った。

    import { tokyoNumber } from "@/tokyoNumber";
でimportする。
{ tokyoNumber } オブジェクトで取得したいから {}
"@/tokyoNumber" の @/ は src/ という意味なのでどのファイルに記述するときでも srcファイルからの相対パスを書くことができる。

    mixins: [tokyoNumber],
と配列で中に記述する。。

#### ミックスインのプロパティ と コンポーネントのプロパティ
ミックスインのプロパティ と コンポーネントのプロパティ が同じ名称の時、
コンポーネントのプロパティが優先される。
優先されるのはプロパティだけではなくメソッドも優先されるのはコンポーネント側
ライフサイクルだけは違う。
ライフサイクルは ミックスインが動作した後 コンポーネントも動作する。

#### グローバルのミックスイン
    Vue.mixin({})
で作成する。
注意なのが、全てのコンポーネントに適応される。

    Vue.mixin({
      created() {
        console.log("global mixin");
      },
    });
global mixinが何度も出力される。

global mixin > mixin > component
という順番でライフサイクルの処理が行われる。

### transition
#### 1つ目の適応方法
消えたり、見えたりするもの

    <transition>
        <p v-if="show">消えたり現れたりするもの</p>
    </transition>
transitionタグには一つの物しか入れられない

#### 2つ目の適応方法
複数のものが入れ替わり表示される


#### 使いかた
    <transition name = "好きな名前"></transition>
を用意して
styelに

    .fade-enter {
    }
    .fade-enter-active {
    }
    .fade-enter-to {
    }
    .fade-leave {
    }
    .fade-leave-acrive {
    }
    .fade-leave-to {
    }
6つのトランジションスタイルを用意する。

transitionはnameを設定しなかった場合は v という名前になる。

    .fade-enter {
      /* 現れる時の初期の状態 */
    }
    .fade-enter-active {
      /* 現れる時のトランジションの状態 */
    }
    .fade-enter-to {
      /* 現れる最後の状態 */
    }
    .fade-leave {
      /* 消えるの初期の状態 */
    }
    .fade-leave-acrive {
      /* 消えるのトランジションの状態 */
    }
    .fade-leave-to {
      /* 消える後の状態 */
    }

transitionの中に複数の要素を入れて動かしたい場合

    <transition name="slide">
      <div v-if="show">
        <p>bye</p>
        <p>Hello</p>
        <p>World</p>
      </div>
    </transition>
みたいにdivで囲い、v-ifは要素につける

    <transition name="slide" type="animation">
にするとanimationの秒数にあわされる。

    <transition name="slide" type="animation" appear>
ページにアクセスしたときもアニメーションを動作させたい場合は
appear 属性をつける。


    <transition name="fade">
      <p v-if="show">さよなら</p>
      <p v-else>こんにちは</p>
    </transition>
animation が適応されない？！？！
vueは効率よく要素を変更するために同じDOM要素のときは再利用する。
つまり、animationが動作しない
key属性をつけるとできる。

#### transition のなかで複数の要素を切り替えたいとき
切り替えたいときは key 属性をつけると良い。
タグが違うくてもkey属性をつけるのは良いこと

    <transition name="fade" mode="out-in">
v-ifで切り替えした時に 切り替える前の要素と切り替えた後の要素が同じ空間に存在するのがいや！
その時にmodeを使う。transition modeとも言われる。
out-in と in-out があり、
要素が消えた後に要素を作るout-inを主に使う。

    <transition name="fade" mode="out-in">
      <component :is="myComponent"></component>
    </transition>
componentを使ってアニメーションで切り替える
    
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"

      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
    >
javascript フックが8種類ある。
    
    beforeEnter(el) {
      // 現れる前
    },
    enter(el, done) {
      // 現れる時
      // 基本的にずっと実行されている。
      done();
      // jsによって扱ってるアニメーションがおわりました！ という意味
      // 非同期処理の場合によく使う。
      // cssがアニメーションをしていても関係なく終了する。
    },
    afterEnter(el) {
      // 現れた後
    },
    enterCancelled(el) {
      // 現れるアニメーションがキャンセルされた時
    },
    beforeLeave(el) {
      // 消える前
    },
    leave(el, done) {
      // 消えるとき
    },
    afterLeave(el) {
      // 消えた後
    },
    leaveCancelled(el) {
      // 消えるアニメーションがキャンセルされた時
      // v-showを扱う時だけ実行される
    },
    
cssアニメーションと同時に実行する場合doneを使わなくても良い
    
css を使わないよ。。というときは

    <transition :css="false">
を明示的に宣言するとcssが読み込まれない。
読み込まれないということは処理がその分早い。

特に重要なのが
beforeEnter, enter, leave

#### splice関数で配列にランダムで数字を追加する方法
      this.numbers.splice(this.randomIndex(), 0, this.nextNumber);
      // どこに 削除するか 何を入れるか
      this.numbers.splice(index, 1);

    <transition-group></>
は spanタグに変わる。

      <transition-group name="fade" tag="div">
tag = "??"
にするとタグを変更することができる。

mode="in-out"とかが使えない
(in-outは要素が消えた時にその要素をなくす)
使うときはtransition を使う。

    .fade-move {
      transition: transform 1s;
    }
    
v-move
というのが使える。
transition: transform ??;
がテンプレ
要素が追加されて動く場合ゆっくり動かす。

vuejsはtransformで要素を動かしている。

要素を削除するときは1秒かけて削除するが、削除完了するまで要素は残り続けるためカクッと消える。

対処法

    .fade-leave-active {
      transition: opacity 0.5s;
      position: absolute;
    }
v-leave-activeの要素を浮かすと良い

#### transitionを再利用する。
コンポーネントにして管理すると良い

## VueRouter
URLごとにコンポーネントを表示することができる。

    npm install vue-router
でインストール

router-link で切り替えて
router-view で描画する。

### router.js
簡潔

    import Vue from "vue";
    import Router from "vue-router";
    import Home from "./views/Home.vue";
    import Users from "./views/Users.vue";

    Vue.use(Router);

    export default new Router({
      mode: "history",
      routes: [
        { path: "/", component: Home },
        { path: "/users", component: Users },
      ],
    });
解説

    import Vue from "vue";
    import Router from "vue-router";

    import Home from "./views/Home.vue";
    import Users from "./views/Users.vue";

    Vue.use(Router);
    // Vue.useはプラグインを適応するという意味
    // プラグインとはグローバルな機能を提供するためのもの、mixin や カスタムディレクティブ のようなもの

    export default new Router({
      mode: "history",
      // "hash" : http:URL/#/  通信がない
      // "history" : http:URL/ 通信がある
      //   デフォルトだとhashになっている
      routes: [
        { path: "/", component: Home },
        { path: "/users", component: Users },
      ],
      // routes: [] URLをマッピングしていく
    });

    // 適応はできてないのでinportする必要がある。
    // import Router from "./router";

    // もともとApp.vueが表示されている。
    // App.vue に <router-view></router-view> を入れると良い
    // <router-view></router-view> は動的コンポーネントのようなものにする。
    
### URLを切り替える方法
1. aタグ
サーバーにアクセスしている。

>     <nav>
>       <a href="/">Home</a>
>       <a href="/users">Users</a>
>     </nav>

2. router-linkタグ
サーバーに接続していない

      <router-link to="/">Home </router-link>
      <router-link to="/users">Users </router-link>

router-linkもtag属性が使えて

    to="??" active-class="link-active"
URLが??から始まる時に付与されるクラス

    to="??" active-class="link-active" exact
exactを付けるとURLが完全に一致している場合適応する。

### javascriptで制御する方法。
router-linkではなくjavascriptで制御する方法がある。

    toUsers() {
      this.$router.push("users");
    },
this.$routerでアクセスすることができる。

### 動的なURL
$router 切り替えたりするもの
$route  今の状況のようなもの

    { path: "/users/:id", component: Users },
    <h4>User Number {{ $route.params.id }}</h4>
paramsの中に格納されている。

      watch: {
        $route(to, from) {
          console.log(to);
          console.log(from);
        },
      },
で中身をみることができる。

### URLの情報をpropsで渡す方法
    { path: "/users/:id", component: Users, props: true  }
とすると :id がpropsの中身として引き渡される。

    props: ["id"],
で受け取れる。

router-view の中に router-view は入れることができない。

#### routerlinkを動的に
    <router-link :to="'/users/' + (Number(id) + 1) + '/profile'"
      >次のユーザー</router-link>

### URLに名前をつけて管理する。
    path: "profile",
    component: UsersProfile,
    name: "user-id-profile",    
そうすると

    <router-link :to="{ name:'user-id-profile' }">
で
/users/  /profile というのになる。

    <router-link :to="{ name:'user-id-profile', params:{ id:文字 } }">
paramsのidに文字を入れることができる。
入れた文字は
/users/文字/profile
というのになる。

    <router-link :to="'/users/' + (Number(id) + 1) + '/profile'">次のユーザー</router-link>
    <router-link :to="{ name: 'user-id-profile', params: { id: Number(id) + 1 } }">次のユーザー</router-link>
が同じ意味になる。

jsで切り替えた関数の方も書き換えることができる。

      this.$router.push("users/1/profile");
を

      this.$router.push({
        name: "user-id-profile",
        params: {
          id: 1,
        },
      });

にすることができる。

### クエリを使う方法
クエリとは URLの後に?がつくやつ

https://okazakirui/home?page=3

的なやつのこと

    toUsers() {
      // this.$router.push("users/1/profile");
      this.$router.push({
        name: "user-id-profile",
        params: {
          id: 1,
        },
        query: {
          lang: "ja",
          page: 2,
        },
      });
    },

queryを追加するだけで良い
profile?lang=ja&page=2

### router-viewに名前を付ける
    routes: [
        {
          path: "/",
          //   component: Home,
          components: {
            default: Home,
            header: HeaderHome,
          },
        },
    ]
component だったのを
components にして
default: デフォルトviewファイル
header: ヘッダーviewファイル
と二つ設定する。

router-viewをnameなしで使用するとdefaultが適応される。

    <router-view name="header"></router-view>
nameに先程の名前を付ける。
すると使うことができる。

propsを使用していた場合は

      props: true,
を

      props: { default: true, header: false },
オブジェクトにして書き換える必要がある。

### リダイレクトを設定する。
    {
      path: "/hello",
      redirect: "/",
    },
/hello が くると / を返す。

pathをワイルドカードにする。

      path: "*",
      redirect: "/",
すると上で設定していないパスが来ると全て / を返すことができる。
path: "/user*"
にするとuserの後が変だとリダイレクトされることになる

### scrollBehavior
      scrollBehavior() {
        return {
          selector: "#nextUser",
        };
        // return { x: 0, y: 0 };
      },
selectorで指定すると指定した要素の位置までスクロールしてくれる。

このままだと要素がピタッと一番上にくる
余白を儲けたい！

    return {
      selector: "#nextUser",
      offset: { x: 0, y: 100 },
    };
offsetを付けると良い

#### 引数が取れる
    //   scrollBehavior(to, from, sevedPosition) {
    //   scrollBehavior(移動先の情報($routeでアクセスできるもの), 移動前の情報($routeでアクセスできるもの), 移動する前position) {
URLにハッシュが存在した場合

    if (to.hash) {
      return { selector: to.hash };
    }
ページ遷移の前の位置があった場合

    if (sevedPosition) {
      return sevedPosition;
    }
    
#### transitionを付けている時
emitでイベントを発火させる。

this.$emit("イベント名")
で発火させていたが今回はmain.jsで発火させたいので

this.$root.$emit("イベント名")
でmain.jsのインスタンスしている場所のイベントを発火することができる。

    return new Promise((resolve) => {
      this.app.$once("triggerScroll", () => {
        //  this. = new Routerを示している。
        //   app に emit されたときの関数を作ることができる。
        console.log(to, from, sevedPosition);
        resolve({ x: 0, y: 100 });
      });
    });
で移動することができる、

    position = { selector: to.hash };
    position = { selector: to.hash, offset: { x: 0, y: 100 } };

完成

    return new Promise((resolve) => {
      this.app.$once("triggerScroll", () => {
        console.log(to, from, sevedPosition);
        let position = { x: 0, y: 0 };
        if (sevedPosition) {
          position = sevedPosition;
        }
        if (to.hash) {
          position = { selector: to.hash };
        }
        resolve(position);
      });
    });

### navigation guard
全てのページ遷移時に実行したいものがある時に使う。

main.js

    router.beforeEach((to, from, next) => {
      next();
      // 終わりを示す。ないと困る。
    });

#### router.jsでも使える。

      routes: [
        {
          path: "/",
          //   component: Home,
          components: {
            default: Home,
            header: HeaderHome,
          },
          beforeEnter(to, from, next) {
            next();
          },
        },

#### コンポーネント内で作成する

      beforeRouteEnter(to, from, next) {
        // インスタンスが作成される前に実行される。
        // this.が使えない
        console.log("beforeRouteEnter");
        next((vm) => {
          console.log(vm.id);
          // URLのidなどが取得できる。
        });
      },
      beforeRouteUpdate(to, from, next) {
        // 中身が変更されたときに実行される
        console.log("beforeRouteUpdate");
        next();
      },
      beforeRouteLeave(to, from, next) {
        // ページを移動しようとしたときに実行される
        console.log("beforeRouteLeave");
        next();
      },

前はwatchを使ってやっていた。
watchでもあまり変わらない。

leaveのよくある使い方

      beforeRouteLeave(to, from, next) {
        const isLeave = window.confirm("本当にこのページを離れますか？");
        if (isLeave) {
          next();
        } else {
          next(false);
        }
      },
ページを離れる時にポップアップを出す。

### 遅延loadingする方法
SPAは最初のアクセスの時に必要な情報を全てダウンロードするので毎度のロードがない。

もしも大規模なプロジェクトになったら？
→ 全てダウンロードしているとロード時間が長い；；

#### webpackの動的import
webpackの仕様に 動的import というものがある。
それを router.js で使う。

    const Home = () => import("./views/Home.vue");
    const Users = () => import("./views/Users.vue");
    const UsersPosts = () => import("./views/UsersPost.vue");
    const UsersProfile = () => import("./views/UsersProfile.vue");
    const HeaderHome = () => import("./views/HeaderHome.vue");
    const HeaderUsers = () => import("./views/HeaderUsers.vue");
これだけで良い。
必要になった時だけ取得する。

開発者ツール(network)を開いてロードをすると
1.js
2.js
3.js
みたいなjsファイルがダウンロードされているのがわかる。

名前を付けたい場合

    const Users = () => import(/* webpackChunkName: "Users" */ "./views/Users.vue");
/* webpackChunkName: "Users" */
で名前を付けることができる。
