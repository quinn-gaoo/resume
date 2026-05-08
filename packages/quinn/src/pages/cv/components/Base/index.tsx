import dayjs from 'dayjs'
import { PiBriefcaseFill, PiGenderIntersexBold, PiCakeFill, PiCalendarFill, PiPhoneFill, PiEnvelopeFill, PiGithubLogoFill, PiGlobeFill } from "react-icons/pi";
const Base = () => {

  return <>
    <section className="base" >
      <div className=''>
        <h2 className='font-[500] text-2xl'>高强强</h2>
        <div className='flex flex-wrap md:gap-6 gap-1 pt-2  text-base'>
          <div className='flex gap-1 items-center'>
            <PiBriefcaseFill />
            <span className='font-[500]'>
              前端开发工程师
            </span>
          </div>
          <div className='flex gap-1 items-center'>
            <PiCalendarFill />
            <span className='font-[500]'>
              {dayjs().year() - 2019}年工作经验
            </span>
          </div>
          <div className='flex gap-1 items-center'>
            <PiCakeFill />
            <span className='font-[500]'>
              {dayjs().year() - 1997}岁
            </span>
          </div>
          {/* <div className='flex gap-1 items-center'>
            <PiMapPinLineFill />
            <span className='font-[500]'>
              成都
            </span>
          </div> */}
          <div className='flex gap-1 items-center'>
            <PiGenderIntersexBold />
            <span className='font-[500]'>
              男
            </span>
          </div>
        </div>
        <div className='flex gap-6 pt-2 text-base'>
          <div className='flex gap-1 items-center'>
            <PiPhoneFill />
            <a href="tel:15504473441">15504473441</a>
          </div>
          <div className='flex gap-1 items-center'>
            <PiEnvelopeFill />
            <a href="mailto:quinnn.gao@gmail.com?subject=Hi, Quinn">quinnn.gao@gmail.com</a>
          </div>
          <div className='flex gap-1 items-center'>
            <PiGithubLogoFill />
            <a className='link_name' href='https://github.com/quinn-getty'>GitHub</a>
          </div>
          <div className='flex gap-1 items-center'>
            <PiGlobeFill />
            <a className='link_name' href='https://qiangqiang.work/'>qiangqiang.work</a>
          </div>
        </div>
      </div>
      <div className="link hidden">
        <div className='link_item'>
          <a className='link_name' href='https://github.com/quinn-getty'>GitHub</a>
          {/* <a className='link_url' href='https://github.com/quinn-getty'>: https://github.com/quinn-getty</a> */}
        </div>
        <div className='link_item'>
          <a className='link_name' href='https://www.cnblogs.com/geter/'>博客园</a>
          {/* <a className='link_url' href='https://www.cnblogs.com/geter/'>: https://www.cnblogs.com/geter/</a> */}
        </div>
        <div className='link_item'>
          <a className='link_name' href='https://juejin.cn/user/4494459265892174'>掘金</a>
          {/* <a className='link_url' href="https://juejin.cn/user/4494459265892174">: https://juejin.cn/user/4494459265892174</a> */}
        </div>
        <div className='link_item'>
          <a className='link_name' href='https://quinn-getty.github.io/CV/'>简历地址</a>
          {/* <a className='link_url' href="https://quinn-getty.github.io/CV/">: https://quinn-getty.github.io/CV/</a> */}
        </div>
      </div>
    </section>
  </>
}
export default Base