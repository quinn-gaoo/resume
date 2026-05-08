
const Work1 = () => {
  return <>
    <section className='work-item'>
      <header>
        <h3> 昊远科技 </h3>
        <h4>前端开发工程师</h4>
        <span className='time'><time>2019年5月</time>~<time>2020年7月</time></span>
      </header>
      <section className="desc">
        <p>
          <strong>独立负责</strong>公司页面的构建，以及UI的交互效果。 根据要求编写HTML、CSS和JS代码，<strong>还原设计稿</strong>上的布局和配色,开发PC/Mobile端应用。与后端同事一起研讨技术实现方案，指定服务接口与测试，和后端共同<strong>优化</strong>、维护<strong>网站性能</strong>。
        </p>
      </section>
      <ul className='project'>
        <li>
          <h4>复工登记</h4>
          <p>
            一款基于<strong>Vue</strong> / <strong>Vant UI</strong> 的疫情复工单位的人员上报的应用。
            该项目使用 Axios 分装数据请求，以 <strong>Vuex</strong> 管理全局数据状态，使用 <strong>VueCli</strong> 进行项目的基础搭建，自动化归类公司员工测量体温手机，基于Echart <strong>数据可视化</strong>异常报警提示等。疫情期间经过高效远程沟通，使得项目提前上线。</p>
          <p>技术栈：Vue2 、Vant UI、VueX、<strong>VueRouter</strong>、VueCli</p>
        </li>
      </ul>
    </section>
  </>
}

export default Work1