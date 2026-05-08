
const Work1 = () => {
  return <>
    <section className='work-item'>
      <header>
        <h3> 滴滴出行 </h3>
        <h4>高级前端工程师</h4>
        <span className='time'><time>2021年6月</time>~<time>2022年4月</time></span>
      </header>
      <section className="desc">
        主要负责滴滴各业务线中客服IM系统的业务需求的维护、开发，技术升级等，负责运营平台系统，以及子系统的重构，搭建开发等。
      </section>
      <ul className='project'>
        <li>
          <h4>运营预警子系统</h4>
          <p>
            主要用于管理公司各个职场中运营指标变化的监控预警系统，通过建立指标阀值，达到自动观测自动通知的目的，并在完成目标后生成分析图表等。此系统全人力投入，从技术选型<strong>React</strong> + <strong>Typescript</strong>，到项目架构<strong>UmiJs</strong>搭建再到细节需求开发，全程参与。项目按期上线，并得到内部嘉奖。
          </p>
          <p>技术栈：<strong>React</strong> 、Ant Design UI、<strong>UmiJS</strong>、<strong>TypeScript</strong></p>
        </li>
        <li>
          <h4>滴滴客服IM</h4>
          <p>
            一款用于滴滴各业务线的即时通讯IM系统，主要使用<strong>Vue全家桶</strong> 搭建的应用。入职时IM通讯系统的技术升级前期，接手后完成了对系统的技术升级由React/JQuery迁移至Vue，完成了IM通讯系统的技术栈统一。并在后面参与完成多场景<strong>智能组件</strong>的开发。降低场景需求的代码开发量。
          </p>
          <p>技术栈：Vue2 、Mand Mobile UI、VueX、<strong>VueRouter</strong>、VueCli、<strong>TypeScript</strong></p>
        </li>
        <li>
          <h4>运营工作台</h4>
          <p>
            主要用于对接运营团队，对接各个子业务线，运营相关的工作。主要负责福利金配置，其他子系统接入运营工作台做开发工作。
          </p>
          <p>技术栈：Vue2 、Element UI、VueX、<strong>VueRouter</strong>、VueCli、<strong>TypeScript</strong></p>
        </li>
      </ul>
    </section>
  </>
}

export default Work1