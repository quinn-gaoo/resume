export default function Education() {
  return <section id="education">
    <header className="pt-2">
      <h2 className=" py-2 font-semibold text-2xl text-[#07132b]">教育经历</h2>
    </header>
    <div>
      <div className="rounded-xl text-card-foreground ">
        <div className="flex flex-col py-3 space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex flex-row items-center gap-1">
              <h3 className="font-semibold tracking-tight text-xl">长春工业大学</h3>·
              <p className="text-muted-foreground text-sm uppercase tracking-[0.16em]">计算机信息管理</p>
            </div>
            <span className="text-sm text-muted-foreground">2016-2019</span>
          </div>
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
}