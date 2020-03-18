/**
 * 注册自定义组件
 */

import BottomMenu from './general/bottom-menu'
import FloorMenu from './general/floor-menu'
import BaseForm from './general/form'
import GridMenu from './general/grid-menu'
import BaseImage from './general/Image'
import BaseText from './general/Text'
import Timeout from './general/Timeout'

import ScrollLeft from './swiper/scroll-left'
import SwiperBanner from './swiper/swiper-banner'

import HorizontalList from './list/horizontal-list'
import VerticalList from './list/vertical-list'

import PageFaq from './pageModule/page-faq'
import PageIntro from './pageModule/page-intro'
import PageParagraph from './pageModule/page-paragraph'
import PageTitle from './pageModule/page-title'

import NewsMarquee from './animate/news-marquee'

export default {
  install(Vue) {
    Vue.component(BottomMenu.name, BottomMenu)
    Vue.component(FloorMenu.name, FloorMenu)
    Vue.component(BaseForm.name, BaseForm)
    Vue.component(GridMenu.name, GridMenu)
    Vue.component(BaseImage.name, BaseImage)
    Vue.component(BaseText.name, BaseText)
    Vue.component(Timeout.name, Timeout)
    Vue.component(NewsMarquee.name, NewsMarquee)
    Vue.component(ScrollLeft.name, ScrollLeft)
    Vue.component(SwiperBanner.name, SwiperBanner)
    Vue.component(HorizontalList.name, HorizontalList)
    Vue.component(VerticalList.name, VerticalList)
    Vue.component(PageFaq.name, PageFaq)
    Vue.component(PageIntro.name, PageIntro)
    Vue.component(PageParagraph.name, PageParagraph)
    Vue.component(PageTitle.name, PageTitle)
  }
}
