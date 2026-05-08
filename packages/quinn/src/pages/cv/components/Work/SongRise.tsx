
const SongRise = () => {
  return <>
    <section className='work-item'>
      <header>
        <h3> 社区建设</h3>
        <h4>高级前端工程师</h4>
        <span className='time'><time>2022年4月</time>~<time>至今</time></span>
      </header>
      <section className="desc">
        这段时间主要家中从一些社区的建设和自身知识提升。活跃的社区主要有SongRise和Avatar，他们都是从事Web3领域的一些应用和游戏的建设。
      </section>
      <ul className='project'>
        <li>
          <h4>SongRise</h4>
          <p>
            主要是通过Web3的形式，将艺术家、歌手的作品通过本平台的转换为独立的token。用户可以在使用web3的环境下订阅自己喜欢的艺术家或者歌手，现在他们独有的音乐或者作品等。
          </p>
          <p>
            主要技术是通过web3的钱包MetaMask、第三方钱包等连接钱包获取签名信息来实现登录功能和身份验证。为了保证数据的安全性，通过web2 + web3的方式，艺术家可以平台上传自己的作品，上链后，其他订阅者或者粉丝用户可以通过订阅的方式订阅查看。
          </p>
          <p>技术栈：<strong>React</strong>、<strong>Material UI</strong>、<strong>ReactRouter</strong>、 <strong>Next.js</strong>、<strong>TypeScript</strong></p>
        </li>
        <li>
          <h4>Avatar</h4>
          <p>
            主要职责Avatar游戏社区的运营端的设施建设和游戏活动页面的搭建。运营管理端主要是用户管理游戏规则、负责游戏空投的管理和游戏游戏关卡文件的管理。活动页面的搭建快速响应搭建出符合UI要求的活动页面，并保持高还原和高适配的场景。
          </p>
          <p>技术栈：React 、Arco Design、<strong>ReactRouter</strong>、Vite、<strong>TypeScript</strong></p>
        </li>
      </ul>
    </section>
  </>
}

export default SongRise