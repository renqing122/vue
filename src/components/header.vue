
<style lang="less" scoped>
	.header {
		position: relative;
		line-height: 20px;
		color: #fff;
	}
</style>
<template>
	<header class="header">
    <div>
      <img src="../pages/index/main.png" width="100%" height="130dx">
    </div>
    <div>请输入店铺名字</div>
      <ul id="nav">
      <li>
        <form id="search-form" action="/articles/search">
      <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
        <input
        type="text" id="search-query-nav" class="search-query st-default-search-input aa-input" name="keywords" v-model="keywords" @keyup.enter="submit"
        autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
        aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;">
        <pre
        aria-hidden="true"
        style="position: absolute; visibility: hidden; white-space: pre; font-family: system-ui; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
        <span
        class="aa-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0"
        style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;"><div
        class="aa-dataset-1"></div></span></span>
        </form>
      </li>
      <li><a href="/books" class="nav-link contribute"></a></li>
    </ul>
	</header>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>