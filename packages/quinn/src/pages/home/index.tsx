import ProjectExperience from "@/components/business/home/ProjectExperience";
import { Button } from "@/components/ui/button";
import workData from '@/data/work-data.json'
import dayjs from "dayjs";
import { toast } from "sonner";
import data from "../cv/template2/data";


const baseInfo = [
  { label: "工作年限", value: dayjs().diff(new Date(data.workStartTime), "y") + "年工作经验" },
  { label: "年龄", value: dayjs().diff(new Date(data.birthTime), "y") + "岁" },
  { label: "期望岗位", value: data.job },
  { label: "电话", value: data.phoneNumber, href: `tel:${data.phoneNumber}` },
  { label: "邮箱", value: data.email, href: `mailto:${data.email}` },
  { label: "GitHub", value: data.githubSite, href: `//${data.githubSite}` },
]

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl container pb-16 pt-8 sm:pb-24 mx-auto">
        <header className="rounded-xl sm:border bg-card p-6 md:p-10">
          <nav className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-black text-white h-9 w-9 rounded">Q</div>
            </div>
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
                  href="#education"
                  className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  教育
                </a>
              </li>
              {/* <li>
                <a
                  href="/cv"
                  className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  简历
                </a>
              </li> */}
              <li>
                <a
                  href="//blog.qiangqiang.work"
                  target="_blank"
                  className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <section>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl py-2">
                {data.name}
              </h1>
              <p className="text-muted-foreground text-sm">{data.job}</p>
              <p className="mt-4 leading-7 text-muted-foreground">
                {data.desc}
              </p>
              <div className="pt-3">
                <Button asChild><a href="./cv">PDF 简历 / 下载</a></Button>
                <Button onClick={() => toast.success("联系已发送", { duration: 200000000 })}>联系我</Button>
              </div>

            </section>
            <aside className="flex flex-col gap-4">
              <div className="rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm flex flex-col space-y-1.5 p-6">
                <h2 className="text-xl font-semibold leading-none tracking-tight pb-6">基础信息</h2>
                <div>
                  <ul className=" space-y-2 text-sm">
                    {
                      baseInfo.map(item => <li key={item.label} className="flex justify-between py-1 border-b">
                        <label className="text-muted-foreground">{item.label}</label>
                        <span>{item.value}</span>
                      </li>)
                    }
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </header>
        <main className="mt-14 space-y-14 sm:mt-16 sm:space-y-16 sm:p-0 p-6">
          <section id="skills" >
            <header className="pb-2">
              <h2 className="text-3xl py-2 font-semibold tracking-tight sm:text-4xl">技能</h2>
            </header>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {
                workData.skills.map((item, index) => {
                  return <div key={index} className="rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm md:p-3">
                    <div className="flex flex-col p-3 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-medium tracking-tight text-base">{item.title}</h3>
                        <span className="text-sm text-muted-foreground">{item.desc}</span>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
          </section>
          <section id="experience" >
            <header className="pb-2">
              <h2 className="text-3xl py-2 font-semibold tracking-tight sm:text-4xl">工作经历</h2>
            </header>
            <div className=" space-y-4">
              {
                data.work.map((item, index) => {
                  return <div key={index} className="rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm md:p-6">
                    <div className="flex flex-col p-6 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-semibold tracking-tight text-xl">{item.company}</h3>
                        <span className="text-sm text-muted-foreground">{item.start} – {item.end}</span>
                      </div>
                      <p className="text-muted-foreground text-xs uppercase tracking-[0.16em]">{item.title}</p>
                    </div>
                    <div className="p-6 pt-0">
                      <ul className="space-y-2.5">
                        {item.experience.map((r, i) => (
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
              <h2 className=" pb-2 text-3xl font-semibold tracking-tight sm:text-4xl">项目经验</h2>
            </header>
            <ProjectExperience />
          </section>
          <section id="education">
            <header className="pb-2">
              <h2 className=" pb-2 text-3xl font-semibold tracking-tight sm:text-4xl">教育经历</h2>
            </header>
            <div>
              <div className="rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm md:p-6">
                <div className="flex flex-col p-6 space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold tracking-tight text-xl">长春工业大学</h3>
                    <span className="text-sm text-muted-foreground">2016-2019</span>
                  </div>
                  <p className="text-muted-foreground text-xs uppercase tracking-[0.16em]">计算机信息管理</p>
                </div>
                <div className="p-6 pt-0">
                  <ul className="space-y-2.5">

                    <li className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      主修课程：数据结构、计算机网络、操作系统、数据库原理、编译原理等
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
