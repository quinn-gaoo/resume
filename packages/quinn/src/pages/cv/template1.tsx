import dayjs from 'dayjs'
import data from '@/data/personal-details.json'
import { PiPhoneFill, PiGithubLogoFill, PiEnvelopeFill, PiGlobeFill, PiNotebookFill, PiWechatLogoFill } from "react-icons/pi";
import Education from './components/education';
import newData from './简历.json'


const row = [
  [
    {
      label: "电 话",
      href: `tel:${data.phoneNumber}`,
      value: data.phoneNumber,
      Icon: PiPhoneFill
    },

    {
      label: "微 信",
      value: "Quinn-Gao",
      Icon: PiWechatLogoFill
    },
    {
      label: "邮 箱",
      value: data.email,
      href: `mailto:${data.email}`,
      Icon: PiEnvelopeFill
    },
  ],
  [
    {
      label: "GitHub",
      value: data.githubSite,
      href: `//${data.githubSite}`,
      Icon: PiGithubLogoFill
    },

    {
      label: "网 站",
      value: data.site,
      href: `//${data.site}`,
      Icon: PiGlobeFill
    },
    {
      label: "博 客",
      value: "blog.qiangqiang.work",
      href: `//blog.qiangqiang.work`,
      Icon: PiNotebookFill
    },
  ],
  [



  ],


]

export default function Template1() {
  const day = new Date();
  document.title = `高强强-高级前端开发工程师-${day.getFullYear()}.${day.getMonth() + 1}.${day.getDate()}`;
  data.birthTime
  return (<>
    <div className="w-screen flex flex-col  bg-[#faf9f9] text-[#333] pb-[20vh] print:py-0 print-color-adjust-exact">
      <div className="text-[#617185] relative w-[21cm] p-8 print:p-0  min-h-[29.7cm] bg-white mx-auto shadow print:shadow-none rounded print:rounded-none ">
        <div className='px-[.2cm]'>
          <div className="text-center">
            <h2 className='py-2 font-semibold tracking-tight text-2xl text-[#07132b]'>{data.name}</h2>
            <div className="font-medium tracking-tight text-sm">
              <span>男</span> · <span>{dayjs().diff(new Date(data.birthTime), "y")}岁</span> · <span>工作{dayjs().diff(new Date(data.workStartTime), "y")}年</span> · <span>本科</span> · <span>月内到岗</span>
            </div>
          </div>
          <div className="w-full font-[450] py-2 text-sm ">
            {
              row.map((col, index) => (<>
                <div key={index} className="flex w-full py-2" >
                  {
                    col.map(item => (<>
                      <div key={item.label} className="w-full pl-8 flex items-center gap-1">
                        <div className="flex bg-[#617185] text-white rounded-full p-1 text-xs">
                          <item.Icon />
                        </div>
                        {
                          item.href
                            ? <a target="_blank" className='text-[#07132b] hover:underline' href={item.href}>{item.value}</a>
                            : <div className="text-[#333]">{item.value}</div>
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
            <h2 className="py-2 font-medium text-2xl text-[#07132b]">技术栈</h2>
            <div className=" text-sm text-[#617185] leading-7 flex flex-wrap gap-2">
              <p><span className="font-medium text-[#333]">框架方向：</span> 深度掌握 Vue 2/3 与 React 运行时原理（响应式系统、Fiber 架构、Diff 算法差异），熟悉状态管理方案（Pinia/Vuex、Redux/Zustand），能够基于业务特征选择合适的技术范式。</p>
              <p><span className="font-medium text-[#333]">AI 能力：</span>将 AI 编程工具（Claude Code、Cursor、Codex... ）集成至日常开发工作流中。了解AI 技术如：RAG, MCP, Skill等,有一定的Rag 知识库开发经验。
              </p>
              <p><span className="font-medium text-[#333]">性能优化：</span> 掌握前端常见性能优化手段，包括代码分割、 懒加载、 资源优化等技术，显著降低FCP（First Contentful Paint）和LCP（Largest Contentful Paint）时间，提升用户交互体验。</p>
              <p><span className="font-medium text-[#333]">架构搭建：</span> 拥有自定义脚手架的能力，可根据需求从0到1搭建整个monorepo/multirepo项目，并自定义构建流程和打包优化。  </p>
              <p><span className="font-medium text-[#333]">单元测试：</span> 掌握Jest、Vitest等前端测试框架，以及Python的自动化测试工具AirTest。针对公共模块能够编写出高覆盖率的测试用例，提升代码健壮性。  </p>
              <p><span className="font-medium text-[#333]">全栈技术：</span> 能够基于 Node.js（Express/Koa）设计 RESTful API，并利用 Next.js/Nuxt.js 实现 SSR 同构应用。在数据层，使用 MySQL/PostgreSQL 与 MongoDB 完成业务数据建模。同时具备 Golang/Python 基础，能够参与跨语言技术方案沟通</p>
            </div>
          </section>

          <section id="experience" >
            <header className="">
              <h2 className="py-2 font-medium text-2xl text-[#07132b]">工作经历</h2>
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
              <h2 className="py-2 font-semibold text-2xl text-[#07132b]">项目经验</h2>
            </header>
            <div className="grid gap-4">
              {
                newData.projects.map((project, index) => {
                  return <ProjectItem project={project} key={index} />
                })}
            </div>
          </section>
          <section id="other-projects">
            <header className="pb-2">
              <h2 className="py-2 font-semibold text-2xl text-[#07132b]">其他项目</h2>
            </header>
            <div className="grid gap-4">
              {
                newData.openSource.map((item, index) => {
                  return <OpenProjectItem project={item} key={index} />
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


function WorkItem({ work }: any) {
  return <div className="bg-card text-card-foreground">
    <div className="flex flex-col py-3 space-y-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className='flex gap-1 items-center'>
          <h3 className="font-semibold tracking-tight text-xl">{work.company}</h3>·
          <p className="text-muted-foreground text-sm uppercase tracking-[0.16em]">{work.title}</p>
        </div>
        <span className="text-sm text-muted-foreground">{work.start}  – {work.end}</span>
      </div>
    </div>
    <div className="py-3 text-sm leading-7  text-[#617185]">
      {work.context}
    </div>
    <div className="pb-3">
      <ul className="space-y-2.5">
        {work.highlights.map((r: any, i: any) => (
          <li key={i} className="flex gap-2.5 text-sm leading-7 text-[#617185]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#07132b]" aria-hidden="true"></span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
}

function ProjectItem({ project }: any) {

  return <div className="text-card-foreground ">
    <div className="flex flex-col py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold tracking-tight text-xl">{project.name}</h3>
        <span className="text-sm text-muted-foreground">{project.start}  – {project.end}</span>
      </div>
    </div>
    <div className="py-3 text-sm leading-7 text-[#617185]">
      {project.description}
    </div>
    <div className="py-3 pt-0">
      <ul className="space-y-2.5">
        {project.highlights.map((r: any, i: any) => (
          <li key={i} className="flex gap-2.5 text-sm leading-7 text-[#617185]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#07132b]" aria-hidden="true"></span>
            <span>{r}</span>
          </li>
        ))}
        <div className="text-sm text-muted-foreground">
          <span className='font-medium text-card-foreground'>技术栈：</span>
          {project.techStack.join(" / ")}
        </div>
      </ul>
    </div>
  </div>
}

function OpenProjectItem({ project }: { project: any }) {
  return <div className="text-card-foreground  ">
    <div className="flex flex-col py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold tracking-tight text-xl">{project.name}</h3>
        {/* <a href={project.url} className="text-sm text-muted-foreground">项目预览</a> */}
      </div>
    </div>
    <p className="py-3 text-sm leading-7 text-[#617185]">
      {project.description}
    </p>
    <div className="py-3 pt-1">
      <ul className="space-y-2.5">
        {project.highlights.map((r: any, i: any) => (
          <li key={i} className="flex gap-2.5 text-sm leading-7 text-[#617185]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#07132b]" aria-hidden="true"></span>
            <span>{r}</span>
          </li>
        ))}
        <div className="text-sm text-muted-foreground">
          <span className='font-medium text-card-foreground'>技术栈：</span>
          {project.techStack.join(" / ")}
        </div>
      </ul>
    </div>
  </div>
}

