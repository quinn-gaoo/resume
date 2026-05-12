import dayjs from 'dayjs'
import data from '@/data/personal-details.json'
import { PiBriefcaseFill, PiCalendarFill, PiGithubLogoFill, PiGlobeFill } from "react-icons/pi";
import { Button } from '@/components/ui/button';
import Education from './components/education';
import newData from './简历.json'


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
      href: `//${data.site}`,
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
      label: "学历",
      value: "本科",
      Icon: PiBriefcaseFill
    },
    {
      label: "博客",
      value: "blog.qiangqiang.work",
      href: `//blog.qiangqiang.work`,
      Icon: PiGlobeFill
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
      href: `//${data.githubSite}`,
      Icon: PiGithubLogoFill
    },
  ],


]

const PrintPage = () => {
  const day = new Date();
  document.title = `高强强-高级前端开发工程师-${day.getFullYear()}.${day.getMonth() + 1}.${day.getDate()}`;
  data.birthTime
  return (<>
    <div className="w-screen flex flex-col  bg-[#e3e3e3] text-[#333] pb-[20vh] print:py-0 print-color-adjust-exact">
      <nav className="sticky print:hidden top-0 z-10 shadow-md w-full bg-white mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-[21cm] mx-auto w-full p-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center justify-center bg-black text-white h-9 w-9 rounded">Q</a>
            ·
            <span className="text-sm font-bold">简历</span>

          </div>
          <div className="flex items-center gap-2">

            <ul className="flex gap-1 text-sm">
              <li>
                <a
                  href="#skills"
                  className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  技能
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  经历
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  项目
                </a>
              </li>
              <li>
                <a
                  href="#other-projects"
                  className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  其他
                </a>
              </li>

              <li>
                <a
                  href="#education"
                  className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  教育
                </a>
              </li>

            </ul>
            <Button
              onClick={() => window.print()}
              size="sm"
            >
              下载 PDF
            </Button>
          </div>

        </div>
      </nav>

      <div className=" relative w-[21cm] px-8 print:px-0  min-h-[29.7cm] bg-white mx-auto shadow-sm print:shadow-none rounded print:rounded-none ">
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
        <div className="" id="skills">
          <section className='py-2'>
            <h2 className="py-2 font-medium text-2xl">技术栈</h2>
            <div className="  text-[13px] leading-5.25 flex flex-wrap gap-2 text-muted-foreground">
              <p><span className="font-medium text-[#333]">框架方向：</span> 深度掌握 Vue 2/3 与 React 运行时原理（响应式系统、Fiber 架构、Diff 算法差异），主导过双框架大型项目的技术选型与迁移。熟练设计状态管理方案（Pinia/Vuex、Redux/Zustand），能够基于业务特征选择合适的技术范式</p>
              <p><span className="font-medium text-[#333]">AI 能力：</span>将 Claude Code/Cursor/Codex 深度集成至研发工作流，构建 AI 辅助编码规范与 Code Review 流水线。掌握 RAG 检索增强与 LangChain 应用框架，具备将 LLM 能力产品化并嵌入业务链路的设计经验。
              </p>
              <p><span className="font-medium text-[#333]">性能优化：</span> 掌握前端常见性能优化手段，包括代码分割、 懒加载、 资源优化等技术，显著降低FCP（First Contentful Paint）和LCP（Largest Contentful Paint）时间，提升用户交互体验。</p>
              <p><span className="font-medium text-[#333]">架构搭建：</span> 拥有自定义脚手架的能力，可根据需求从0到1搭建整个monorepo/multirepo项目，并自定义构建流程和打包优化。  </p>
              <p><span className="font-medium text-[#333]">单元测试：</span> 掌握Jest、Vitest等前端测试框架，以及Python的自动化测试工具AirTest。针对公共模块能够编写出高覆盖率的测试用例，提升代码健壮性。  </p>
              {/* <p><span className="font-medium text-[#333]">Web3方向：</span> 熟悉web3 生态，有 web3 前端开发相关经验，熟悉web3.js、ethers.js等前端库。 并和链上数据交互。 </p> */}
              <p><span className="font-medium text-[#333]">全栈技术：</span> 使用 Node.js（Express/Koa/Next.js/Nuxt.js）设计 RESTful API 与 SSR 同构应用，具备 Golang/Python 多语言协作经验。熟悉关系型（MySQL/PostgreSQL）与非关系型（MongoDB）数据库设计，能够完成业务数据建模与性能调优</p>
            </div>
          </section>

          <section id="experience" >
            <header className="">
              <h2 className="py-2 font-semibold tracking-tight text-2xl">工作经历</h2>
            </header>
            <div className="space-y-4">
              {/* {
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
              } */}
              {
                newData.work.map((item, index) => {
                  return <div key={index} className="bg-card text-card-foreground">
                    <div className="flex flex-col py-3 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className='flex gap-1 items-center'>
                          <h3 className="font-semibold tracking-tight text-xl">{item.company}</h3>·
                          <p className="text-muted-foreground text-sm uppercase tracking-[0.16em]">{item.title}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.start}  – {item.end}</span>
                      </div>
                    </div>
                    <div className="py-3 text-sm leading-relaxed text-muted-foreground">
                      {item.context}
                    </div>
                    <div className="pb-3">
                      <ul className="space-y-2.5">
                        {item.highlights.map((r, i) => (
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
              {/* {
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
                })} */}
              {
                newData.projects.map((work, index) => {
                  return <div key={index} className="text-card-foreground  ">
                    <div className="flex flex-col py-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-semibold tracking-tight text-xl">{work.name}</h3>
                        <span className="text-sm text-muted-foreground">{work.start}  – {work.end}</span>

                      </div>
                    </div>
                    <div className="py-3 text-sm leading-relaxed text-muted-foreground">
                      {work.description}
                    </div>
                    <div className="py-3 pt-0">
                      <ul className="space-y-2.5">
                        {work.highlights.map((r, i) => (
                          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true"></span>
                            <span>{r}</span>
                          </li>
                        ))}
                        <div className="text-sm text-muted-foreground">
                          <span className='font-medium text-card-foreground'>技术栈：</span>
                          {work.techStack.join(" / ")}
                        </div>
                      </ul>
                    </div>
                  </div>
                })}
            </div>
          </section>
          <section id="other-projects">
            <header className="pb-2">
              <h2 className="py-2 font-semibold tracking-tight text-2xl">其他项目</h2>
            </header>
            <div className="grid gap-4">
              {
                newData.openSource.map((item, index) => {
                  return <div key={index} className="text-card-foreground  ">
                    <div className="flex flex-col py-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-semibold tracking-tight text-xl">{item.name}</h3>
                        {/* <span className="text-sm text-muted-foreground">{work.timeRange[0]} – {work.timeRange[1]}</span> */}
                      </div>
                    </div>
                    <p className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="py-3 pt-1">
                      <span className='text-sm font-medium text-card-foreground'>主要职责：</span>
                      <ul className="space-y-2.5">
                        {item.highlights.map((r, i) => (
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
                })}
            </div>
          </section>
          <Education />
        </div>
      </div>
    </div>
  </>

  );
}


export default PrintPage
