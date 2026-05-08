import dayjs from 'dayjs'
import data from '@/data/personal-details.json'
import { PiBriefcaseFill, PiCalendarFill, PiGithubLogoFill, PiGlobeFill } from "react-icons/pi";
import workData from '@/data/work-data.json'
import { Button } from '@/components/ui/button';


const row = [
  [
    {
      label: "年 龄",
      value: dayjs().diff(new Date(data.birthTime), "y") + "岁",
      Icon: PiCalendarFill
    },
    {
      label: "网 站",
      value: data.site,
      href: data.site,
      Icon: PiGlobeFill
    },
  ],
  [
    {
      label: "年 限",
      value: dayjs().diff(new Date(data.workStartTime), "y") + "年工作经验",
      Icon: PiBriefcaseFill
    },
    {
      label: "邮 箱",
      value: data.email,
      href: `mailto:${data.email}`,
      Icon: PiBriefcaseFill
    },

  ],
  [

    {
      label: "电 话",
      href: `tel:${data.phoneNumber}`,
      value: data.phoneNumber,
      Icon: PiCalendarFill
    },
    {
      label: "GitHub",
      value: data.githubSite,
      href: data.githubSite,
      Icon: PiGithubLogoFill
    },
  ],

]

const PrintPage = () => {
  const day = new Date();
  document.title = `高强强-前端开发工程师-${day.getFullYear()}.${day.getMonth() + 1}.${day.getDate()}`;
  data.birthTime
  return (
    <div className="w-screen  bg-[#e3e3e3] text-[#333] pt-[12vh] pb-[20vh] print:py-0 print-color-adjust-exact">
      <div className=" relative w-[21cm] px-8 print:px-0 min-h-[29.7cm] bg-white mx-auto shadow-sm print:shadow-none rounded print:rounded-none ">
        <Button className='print:hidden -translate-y-full' onClick={window.print}>打印</Button>
        <div className='px-[.2cm]'>
          <div className="text-center">
            <h2 className='py-2 font-semibold tracking-tight text-3xl'>{data.name}</h2>
            <div className="font-medium tracking-tight text-base">
              前端开发工程师  <span className="px-0.5">/</span> 月内到岗
            </div>
          </div>
          <div className="w-full font-[450] py-2 text-[13px] text-gray-600">
            {
              row.map((col, index) => (<>
                <div key={index} className="flex w-full pb-2" >
                  {
                    col.map(item => (<>
                      <div key={item.label} className="w-full pl-8 flex gap-2">
                        <div className="flex gap-1 items-center">
                          <item.Icon />
                          <span>{item.label}:</span>
                        </div>
                        {
                          item.href
                            ? <a target="_blank" className='link_name' href={item.href}>{item.value}</a>
                            : <div>{item.value}</div>
                        }
                      </div>
                    </>
                    ))
                  }
                </div>
              </>
              ))
            }

          </div>
        </div>
        <div className="">
          <section className='py-2'>
            <h2 className="py-2 font-medium text-2xl">技术栈</h2>
            <div className="  text-[13px] leading-5.25 flex flex-wrap gap-2 text-muted-foreground">
              <p><span className="font-medium text-[#333]">框架方向：</span> 精通Vue2/3、React 等现代前端框架，理解两个框架之间的核心原理以及差异，拥有两大框架开发多个大型项目的经验，对两大框架的周边生态（Vue Router、Pina、 VueX、 React Router 、 Redux、 Zustand）有一定的使用心得体会。</p>
              <p><span className="font-medium text-[#333]">性能优化：</span> 掌握前端常见性能优化手段，包括代码分割、 懒加载、 资源优化等技术，显著降低FCP（First Contentful Paint）和LCP（Largest Contentful Paint）时间，提升用户交互体验。</p>
              <p><span className="font-medium text-[#333]">架构搭建：</span> 拥有自定义脚手架的能力，可根据需求从0到1搭建整个monorepo/multirepo项目，并自定义构建流程和打包优化。  </p>
              <p><span className="font-medium text-[#333]">单元测试：</span> 掌握Jest、Vitest等前端测试框架，以及Python的自动化测试工具AirTest。针对公共模块能够编写出高覆盖率的测试用例，提升代码健壮性。  </p>
              <p><span className="font-medium text-[#333]">Web3方向：</span> 熟悉web3 生态，有 web3 前端开发相关经验，熟悉web3.js、ethers.js等前端库。 并和链上数据交互。 </p>
              <p><span className="font-medium text-[#333]">后端能力：</span> 熟悉Node.js的后端框架（如Express、Koa、Next.js、Nuxt.js），了解Golang、Python其他后端语言。能够设计并实现Restful风格得API，做到前后端分离和SSR。  </p>
              <p><span className="font-medium text-[#333]">数据库方向：</span> 了解基本SQL语句，以及Mysql、PostgreSQL,MonngoDB的使用，能够设计简单的数据库模型，进行数据CURD操作。  </p>
            </div>
          </section>

          <section id="experience" >
            <header className="">
              <h2 className="py-2 font-semibold tracking-tight text-2xl">工作经历</h2>
            </header>
            <div className="space-y-4">
              {
                workData.workExperience.map((item, index) => {
                  return <div key={index} className="bg-card text-card-foreground">
                    <div className="flex flex-col py-3 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className='flex gap-1 items-center'>
                          <h3 className="font-semibold tracking-tight text-xl">{item.company}</h3>·
                          <p className="text-muted-foreground text-sm uppercase tracking-[0.16em]">{item.position}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.timeRange[0]} – {item.timeRange[1]}</span>
                      </div>
                    </div>
                    <div className="pb-3">
                      <ul className="space-y-2.5">
                        {item.responsibilities.map((r, i) => (
                          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true"></span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                })
              }
            </div>
          </section>
          <section id="projects">
            <header className="pb-2">
              <h2 className="py-2 font-semibold tracking-tight text-2xl">项目经验</h2>
            </header>
            <div className="grid gap-4">
              {
                workData.workExperience.map((work) => {
                  if (work.projectExperience) {
                    return work.projectExperience.map((item, index) => {
                      return <div key={index} className="text-card-foreground  ">
                        <div className="flex flex-col py-3">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="font-semibold tracking-tight text-xl">{item.name}</h3>
                            <span className="text-sm text-muted-foreground">{work.timeRange[0]} – {work.timeRange[1]}</span>

                          </div>
                        </div>
                        <div className="py-3 pt-0">
                          <ul className="space-y-2.5">
                            {item.responsibilities.map((r, i) => (
                              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true"></span>
                                <span>{r}</span>
                              </li>
                            ))}
                            <div className="text-sm text-muted-foreground">
                              <span className='font-medium text-card-foreground'>技术栈：</span>
                              {item.techStack.join(" / ")}
                            </div>
                          </ul>
                        </div>
                      </div>
                    })
                  }
                })}
            </div>
          </section>
          <section id="education">
            <header className="pb-2">
              <h2 className=" pb-2 font-semibold tracking-tight text-3xl">教育经历</h2>
            </header>
            <div>
              <div className="rounded-xl text-card-foreground ">
                <div className="flex flex-col py-3 space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold tracking-tight text-xl">长春工业大学</h3>
                    <span className="text-sm text-muted-foreground">2016-2019</span>
                  </div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.16em]">计算机信息管理</p>
                </div>
                <div className="py-3 pt-0">
                  <ul className="space-y-2.5">

                    <li className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      主修课程：数据结构、计算机网络、操作系统、数据库原理、编译原理等
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

  );
}


export default PrintPage
