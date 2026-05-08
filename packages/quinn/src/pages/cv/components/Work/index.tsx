import Work1 from './Work1'
import Work2 from './Work2'
import Work3 from './Work3'
import SongRise from './SongRise'
import './index.scss'

const Work = () => {
  return <>
    <section>
      <h2>教育经历</h2>
      <section className='work-item'>
        <header>
          <h3> 长春工业大学 </h3>
          <h4>计算机信息管理专业</h4>
          <span className='time'><time>2016年9月</time>~<time>2019年6月</time></span>
        </header>
      </section>
    </section>
    <section>
      <h2>工作经历</h2>
      <SongRise />
      <Work1 />
      <Work2 />
      <Work3 />
    </section>
  </>
}

export default Work;