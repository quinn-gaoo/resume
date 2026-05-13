import { Button } from '@/components/ui/button';
import Template1 from './template1'



const PrintPage = () => {

  return (<>
    <div className="w-screen flex flex-col  bg-[#faf9f9] text-[#333] pb-[20vh] print:py-0 print-color-adjust-exact">
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

      <Template1 />
    </div>
  </>

  );
}


export default PrintPage
