import dayjs from 'dayjs'
import data from './data'
import { PiPhoneFill, PiGithubLogoFill, PiEnvelopeFill, PiGlobeFill, PiNotebookFill, PiWechatLogoFill } from "react-icons/pi";
import newData from './data'
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const row = [
  [
    {
      label: "微 信",
      value: "Quinn-Gao",
      Icon: PiWechatLogoFill
    },
    {
      label: "电 话",
      href: `tel:${data.phoneNumber}`,
      value: data.phoneNumber,
      Icon: PiPhoneFill
    },
    {
      label: "学 校",
      value: "长春工业大学",
      // href: `//blog.qiangqiang.work`,
      Icon: PiNotebookFill
    },

  ],
  [

    {
      label: "邮 箱",
      value: data.email,
      href: `mailto:${data.email}`,
      Icon: PiEnvelopeFill
    },
    {
      label: "网 站",
      value: data.site,
      href: `//${data.site}`,
      Icon: PiGlobeFill
    },
    {
      label: "GitHub",
      value: data.githubSite,
      href: `//${data.githubSite}`,
      Icon: PiGithubLogoFill
    },

  ],
]

export default function Template1() {
  const day = new Date();
  document.title = `高强强-高级前端开发工程师-${day.getFullYear()}.${day.getMonth() + 1}.${day.getDate()}`;
  data.birthTime

  const projects = useMemo(() => {
    const list: any[] = []
    newData.work.forEach(item => {
      list.push(...item.projects)
    })
    return list
  }, [newData.work])
  return (<>
    <div className="w-screen flex flex-col  bg-[#faf9f9] text-[#07132b] pb-[20vh] print:py-0 print-color-adjust-exact">
      <div className="relative w-[21cm] p-8 print:p-0  min-h-[29.7cm] bg-white mx-auto shadow print:shadow-none rounded print:rounded-none ">
        <div className='px-[.2cm]'>
          <div className="text-center">
            <h2 className='py-2 font-semibold tracking-tight text-2xl '>{data.name}</h2>
            <div className="font-medium tracking-tight text-sm">
              <span>男</span> · <span>{dayjs().diff(new Date(data.birthTime), "y")}岁</span> · <span>工作{dayjs().diff(new Date(data.workStartTime), "y")}年</span>
            </div>
          </div>
          <div className="w-full font-[450] py-2 text-sm ">
            {
              row.map((col, index) => (<>
                <div key={index} className="flex w-full py-2" >
                  {
                    col.map(item => (<>
                      <div key={item.label} className="w-full pl-4 flex items-center gap-1">
                        <div className="flex w-12 font-semibold p-1 text-xs">
                          {/* <item.Icon /> */}
                          {item.label}
                        </div>
                        {
                          item.href
                            ? <a target="_blank" className=' hover:underline' href={item.href}>{item.value}</a>
                            : <div className="">{item.value}</div>
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
        <div className="" >
          <section className='py-2' id="skills">
            <h2 className="py-2 pt-1 font-medium text-xl">技术栈</h2>
            <ul className=" text-sm leading-7 flex flex-wrap gap-2   text-[#2b405b]">
              <li className="">
                <span className="inline-block px-2.5 rounded-3xl font-bold mr-1 bg-[#dde1987a] leading-5">框架能力</span>
                深度掌握 Vue 2/3 与 React 运行时原理，理解响应式系统、Fiber 架构、Diff 算法差异等，熟悉状态管理方案（Pinia/Vuex、Redux/Zustand），能够基于业务特征选择合适的技术范式。熟悉Next.js/Nuxt.js 的 SSR 开发经验，熟悉其架构和最佳实践。
              </li>

              <li>
                <span className="inline-block px-2.5 rounded-3xl font-bold mr-1 bg-[#dde1987a] leading-5">性能优化</span>
                掌握前端常见性能优化手段，包括代码分割、 懒加载、 资源优化、SSR 服务端渲染 、缓存优化、图片压缩、资源合并等技术，显著降低FCP和LCP时间，提升用户交互体验。
              </li>
              <li>
                <span className="inline-block px-2.5 rounded-3xl font-bold mr-1 bg-[#dde1987a] leading-5">工程能力</span>
                掌握主流构建工具（如：Vite、Webpack、Rollup等）了解不同工具核心原理以及差异，并拥有自定义脚手架的能力，能根据需求从0到1搭建monorepo/multirepo 仓库项目，有自定义构建流程CI/CD和打包优化的能力，更具项目添加服务监控和日志分析能力。
              </li>
              <li>
                <span className="inline-block px-2.5 rounded-3xl font-bold mr-1 bg-[#dde1987a] leading-5">后端能力</span>
                熟悉 Node.js及 Express/Koa 框架，能够设计出符合 RESTful API 风格的接口层以及 BFF 服务的落地实现。了解后端数据库（如PostgreSQL、MongoDB等）和缓存（如Redis等）,能够设计简单数据库模型，进行数据CRUD操作。
              </li>
              <li>
                <span className="inline-block px-2.5 rounded-3xl font-bold mr-1 bg-[#dde1987a] leading-5">测试能力</span>
                掌握Jest、Vitest等前端测试框架，有Python的自动化测试工具AirTest使用经验。针对公共模块能够编写出高覆盖率的测试用例，提升代码健壮性。
              </li>
              <li>
                <span className="inline-block px-2.5 rounded-3xl font-bold mr-1 bg-[#dde1987a] leading-5">AI能力</span>
                将 AI 编程工具（Claude Code、Cursor、Codex... ）集成至日常开发工作流中。了解AI 相关技术如：RAG, MCP, Skill, LangChain 等。
              </li>
              {/* <li>
                <span className="inline-block px-2.5 rounded-3xl font-bold mr-1 bg-[#dde1987a] leading-5">前端基础</span>
                拥有扎实的HTML、CSS、JavaScript基础，针对部分前端核心知识有深入研究，心得发布博客平台。熟练掌握Typescript,并在大型项目中能能够利用Typescript 进行了类型检查和代码优化，提升代码的可维护性和可靠性。
              </li> */}
            </ul>
          </section>

          <section id="experience" >
            <header className="">
              <h2 className="py-1 font-medium text-xl">工作经历</h2>
            </header>
            <div className="space-y-4">
              {
                newData.work.map((item, index) => {
                  return <WorkItem work={item} key={index} />
                })
              }
            </div>
          </section>
          <section id="projects">
            <header className="pb-2">
              <h2 className="py-2 font-semibold text-xl">项目经验</h2>
            </header>
            <div className="grid gap-4">
              {
                projects.map((project, index) => {
                  return <ProjectItem project={project} key={index} />
                })}
            </div>
          </section>
          {/* <section id="other-projects">
            <header className="pb-2">
              <h2 className="py-2 font-semibold text-xl text-[#07132b]">其他项目</h2>
            </header>
            <div className="grid gap-4">
              {
                newData.openSource.map((item, index) => {
                  return <OpenProjectItem project={item} key={index} />
                })}
            </div>
          </section> */}
          <Education />
        </div>
      </div>
    </div>
  </>

  );
}


function WorkItem({ work }: any) {
  return <div className="bg-card text-card-foreground space-y-2.5">
    <div className="flex flex-col py-2 ">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className='flex gap-1 items-center'>
          <h3 className="font-semibold tracking-tight text-[18px]">{work.company}</h3>·
          <p className="text-muted-foreground text-sm uppercase tracking-[0.16em]">{work.title}</p>
        </div>
        <span className="text-sm text-muted-foreground">{work.start}  – {work.end}</span>
      </div>
    </div>
    <div className={cn(work.experience?.length > 0 ? "" : " hidden")}>
      <div className=" pl-8">
        {work.experience?.map((r: any, i: any) => (
          <li key={i} className="flex gap-2.5 text-sm leading-7 text-[#2b405b]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#07132b]" aria-hidden="true"></span>
            <span>{r}</span>
          </li>
        ))}
      </div>
    </div>
  </div>
}

function ProjectItem({ project }: any) {

  return <div className="text-card-foreground space-y-3">
    <div className="flex flex-col ">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold tracking-tight text-xl">{project.name}</h3>
        <span className="text-sm text-muted-foreground">{project.start}  – {project.end}</span>
      </div>
    </div>
    <div className=" text-sm leading-7 text-[#2b405b]">
      {project.description}
    </div>
    <div className="text-sm text-muted-foreground">
      <span className='font-medium text-card-foreground'>技术栈：</span>
      {project.stack.join(" / ")}
    </div>
    <div className="space-y-2">
      {/* {
        project.responsibilities?.length > 0 &&
        <div>
          <h1 className="font-medium text-sm text-[#2b405b]">项目职责</h1>
          <div className="pl-4">
            {project.responsibilities?.map((r: any, i: any) => (
              <li key={i} className="flex gap-2.5 text-sm leading-7 text-[#2b405b]">
                <span>{i + 1}.</span>
                <span>{r}</span>
              </li>
            ))}
          </div>
        </div>
      } */}
      {
        project.highlights?.length > 0 &&
        <div>
          <h1 className="font-medium text-sm text-[#2b405b]">项目业绩</h1>
          <div className="pl-4">
            {project.highlights.map((r: any, i: any) => (
              <li key={i} className="flex gap-2.5 text-sm leading-7 text-[#2b405b]">
                <span>{i + 1}.</span>
                <span>{r}</span>
              </li>
            ))}
          </div>
        </div>
      }
    </div>
  </div>
}





function Education() {
  return <section id="education">
    <header className="pt-2">
      <h2 className=" py-2 font-semibold text-xl text-[#07132b]">教育经历</h2>
    </header>
    <div>
      <div className="rounded-xl text-card-foreground ">
        <div className="flex flex-col py-3 space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex flex-row items-center gap-1">
              <h3 className="font-semibold tracking-tight text-[18px]">长春工业大学</h3>·
              <p className="text-muted-foreground text-sm uppercase tracking-[0.16em]">计算机信息管理</p>
            </div>
            <span className="text-sm text-muted-foreground">2016-2019</span>
          </div>
        </div>
        <div className="py-3 pt-0">
          <ul className="space-y-2.5">

            <li className="flex gap-2.5 text-sm leading-relaxed text-[#2b405b]">
              主修课程：数据结构、计算机网络、操作系统、数据库原理、编译原理等
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
}