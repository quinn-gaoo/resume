
const Work1 = () => {
  return <>
    <section className='work-item'>
      <header>
        <h3> 九机科技 </h3>
        <h4>中级前端工程师</h4>
        <span className='time'><time>2020年9月</time>~<time>2021年6月</time></span>
      </header>
      <section className="desc">
        开发小型系统,维护租户个性化需求。负责oa系统前端架构的翻新，主要开发售、前售财务后模块和负责内部自营组件的分装和基于andv UI库的<strong>二次分装</strong>。
        {/* 定期组织内部分享，包括 Git 的使用、<strong>ES6 新特性</strong>、<strong>TypeScript</strong>、<strong>vite</strong> 等话题。 */}
      </section>
      <ul className='project'>
        <li>
          <h4>九机OA</h4>
          <p>是九机员工使用的一款内部<strong>办公软件</strong>和<strong>O2O</strong>系统的整合。主要包括内部员工管理的有人事管理、分公司管理、销售管理等。以及销售系统的库存管理、进货管理、市场管理等。提高员工的工作效率，和完善<strong>流程化</strong>的操作，方便快捷。</p>
          <p>技术栈：Vue2 AntdV VueX VueRouter Webpack</p>
        </li>
        <li>
          <h4>九讯云</h4>
          <p>是基于九机现有的内部系统，进行精简和优化处理的一个O2O产品，经过五个月团队的开发圆满完成预期工期，并且有多家租户上线使用，目前项目处于对云南白药公司的个性化自定开发中。</p>
          <p>技术栈：Vue2 <strong>AntdV</strong> VueX VueRouter <strong>Webpack</strong> <span>(个性化制定已尝试 <strong>Vite</strong><strong>Vue3</strong> <strong>VueX4</strong> <strong>VueRouter4</strong>)</span> </p>
          <p></p>
        </li>
      </ul>
    </section>
  </>
}

export default Work1