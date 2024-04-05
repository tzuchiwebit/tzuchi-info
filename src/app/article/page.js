"use client"
import Container from "@/shared/layout/Container"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import styled from "styled-components"
import { BannerTitle } from "@/components/home/components"
import { SocialBar } from "@/components/article/components"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import screens from "@/shared/styles/screens";

const StyledImage = styled.div`
  width: 100%;
  height: 560px;
  background-image: url("https://picsum.photos/id/230/900");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const Article = () => {
  return (
    <div style={{gridArea: 'a'}}>
      <div className="text-[30px] font-bold text-primary-blue1">
          單篇文章 單篇文章
      </div>
      <div className="flex flex-row items-center gap-x-2 mt-4">
        {/* metadata: date, arthur, location */}
        <span className="text-[14px] text-gray-gray4 font-medium">2024-01-21</span>
        <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
        <span className="text-[14px] text-gray-gray4 font-medium">發布作者</span>
        <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
        <span className="text-[14px] text-gray-gray4 font-medium">地點</span>
        <div className="flex flex-1 text-lg border-solid border-b-2 border-gray-gray7" />
        <SocialBar isMobile={false}></SocialBar>
      </div>
      {/* <Image className="mt-6 rounded" src="https://picsum.photos/id/230/878/564" alt="" width={878} height={564}/> */}
      <StyledImage className="mt-6 rounded"></StyledImage>
      <div className="mt-2 font-medium text-gray-gray2 border-b border-solid border-gray-gray7 pb-1">12月下旬上人因身體不適，不克前往台中親自主持歲末祝福，上人感受到弟子的失落，延長行腳時程，來到臺中，思及當時情景，勉勵靜思弟子：「那個經藏演繹的場面，他們拉著一條繩子。這條繩子就是慧命要相傳，所以這條繩子是這麼大，這樣在拉，慈濟的慧命要不斷連續下去。」（攝影者：陳福成）</div>
      <div className="mt-6 font-bold text-black leading-[22px]">
        【證嚴上人行腳1月18日臺中靜思堂溫馨座談】
        <br/>
        「師父學佛，所以師父要學習佛，將佛陀的教法講給你們聽，你們就學師父以『師志為己志，佛心為己心』，佛陀的心就是大慈悲心，師父的志向就是把佛陀的慈悲喜捨落實在人間。」
        <br/><br/>
        學佛就是學習佛陀慈悲喜捨的心，將菩薩法應用在人間，鋪出菩提大道直。證嚴上人行腳，1月18日在臺中靜思堂慈濟人聯誼會上對靜思弟子開示，闡明學佛的真諦在於行經，期許眾人莫忘以佛心為己心，以師志為己志。
        <br/>
        <br/>
        想師敬師師常在 精進如常續慧命
        <br/><br/>
        上人此次行腳，原訂2023年12月下旬，即自臺北往南行，未料在桃園時因身體不適又北返臺北，隨後歲末祝福行程由靜舍師父代為主持，歲末祝福上人座椅空蕩無人⋯⋯
        <br/><br/>
        「聽到你們說，看到那一張椅子空著，簡院長（簡守信）在這個地方我在新店看，看到這一大群莊嚴的菩薩，看到了大醫王、白衣大士，在這個地方，簡院長說出了他的心聲，那樣真誠的情流露出來。」
        <br/><br/>
        「那個畫面，我自己看到那張椅子就是缺一個人。所以讓簡院長和大醫王那樣的感慨，那樣的深。我看、我聽，我很感動。所以在那個時間，我說不管我怎樣，拖命，我也要到臺中去。」
        <br/><br/>
        不捨弟子想師之情，上人延長行腳時間，南下臺中。
        <br/><br/>
        「你們現在也可以看出，師父是怎樣吃力說話，就是因為那個場面（台中歲末祝福的連線畫面），他們拉著一條繩子。這條繩子就是慧命要相傳，所以這條繩子是這麼大，這樣在拉，慈濟的慧命要不斷連續下去。」
        <br/><br/>
        「他們是很用力，這個畫面，燈光不好，看不出浩蕩長，那是很長，很出力。我坐在新店，簡院長說他看到這一張椅子，竟然是空的，他的心……」
        <br/><br/>
        「聽到他說這些話，看到他的表情，我不捨。所以我就那天開始，我自己就很養力。真的是，來到臺北點滴等等。在那個地方真的是養氣，養力，終於下來了。」
      </div>
    </div>
  )
}

const ExtendArticles = () => {
  const results = Array(3).fill({
    title: '單篇文章標題 單篇文章標題',
    date: '2014/12/22',
    author: '慈濟基金會'
  });

  return (
    <div style={{gridArea: 'c'}}>
      <BannerTitle title={"延伸閱讀"} />
      <div className="laptop:mt-6 mt-4 flex flex-col laptop:gap-y-4 gap-y-2">
        {
          results.map((item, index) => (
            <div className="cursor-pointer" key={index}>
              <div className="text-[24px] font-bold text-primary-blue1">{item.title}</div>
              <div className="flex flex-row items-center gap-x-2 laptop:mt-2 mt-1">
                <span className="text-[14px] text-gray-gray4 font-medium">{item.date}</span>
                <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
                <span className="text-[14px] text-gray-gray4 font-medium">{item.author}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const RecommandArticles = () => {
  const results = Array(3).fill({
    title: '單篇文章標題',
    date: '2014/12/22',
    author: '慈濟基金會'
  });

  return (
    <div style={{gridArea: 'b'}}>
      <BannerTitle title={"推薦閱讀"} />
      <div className="laptop:mt-6 mt-4 flex flex-col laptop:gap-y-4 gap-y-2">
        {
          results.map((item, index) => (
            <div className="cursor-pointer" key={index}>
              <div className="text-[24px] font-bold text-primary-blue1">{item.title}</div>
              <div className="flex flex-row items-center gap-x-2 laptop:mt-2 mt-1">
                <span className="text-[14px] text-gray-gray4 font-medium">{item.date}</span>
                <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
                <span className="text-[14px] text-gray-gray4 font-medium">{item.author}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default function Page() {
  return <>
    <Container>
      <FloatScrollTopButton />
      {/* breadcrumb */}
      <div className="flex w-full flex-col gap-5">
        <div className="flex pt-[30px] gap-1">
          <PrimaryBreadcrumb
            items={[
              {
                label: '首頁',
                link: '/'
              },
              {
                label: '認識慈濟',
                link: ''
              },
              {
                label: '公益勸募',
                link: ''
              },
            ]} />
        </div>
      </div>
      <ArticleContainer className="mt-6">
        <Article></Article>
        <RecommandArticles></RecommandArticles>
        <ExtendArticles></ExtendArticles>
      </ArticleContainer>
    </Container>
    <SocialBar isMobile={true}></SocialBar>
  </>
}

const ArticleContainer = styled.div`
    width: 100%;
    padding-bottom: 12px;
    @media(max-width: ${screens.tablet}) {
      display: flex;
      flex-direction: column;
      row-gap: 32px;
    }
    @media(min-width: ${screens.laptop}) {
      display: grid;
      column-gap: 22px;
      row-gap: 32px;
      grid-template: auto auto / 620px 1fr;
      grid-template-areas:
        'a b'
        'c c';
    }
    @media(min-width: ${screens.desktop}) {
      display: grid;
      column-gap: 22px;
      row-gap: 32px;
      grid-template: auto auto / 878px 1fr;
      grid-template-areas:
        'a b'
        'c c';
    }
`
