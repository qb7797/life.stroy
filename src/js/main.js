// bootstrap
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle'

// import Swiper JS
import Swiper, {
  Navigation,
  Pagination,
  Scrollbar
} from 'swiper'


// animations
import AOS from "aos"

AOS.init({
  startEvent: 'load',
  offset: 200,
  duration: 550,
  easing: 'ease-in-sine',
  delay: 0,
  once: true,
});


const html = document.querySelector('html')
const main = document.querySelector('main')
const body = document.querySelector('body')
const burger = document.querySelector('.burger')
const mainnav = document.querySelector('.header-mainnav')
const headerTop = document.querySelector('.header-top')


if (burger) {

  burger.addEventListener('click', () => {

    body.classList.toggle('overflow-hidden')
    // main.classList.toggle('overflow-hidden')
    // html.classList.toggle('overflow-hidden')
    burger.classList.toggle('active')
    mainnav.classList.toggle('show')
    headerTop.classList.toggle('active')

  
    // document.querySelector('html').classList.toggle('ov')
    // body.classList.toggle('av')
  }) 
}



// get user inner height window

const newHeight = window.innerHeight
html.style.setProperty('--h', newHeight + 'px')

window.addEventListener('resize', () => {
  const html = document.querySelector('html')
  const newHeight = window.innerHeight

  html.style.setProperty('--h', newHeight + 'px')
})

//  get scrollbar width
function getScrollbarWidth() {
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  outer.style.msOverflowStyle = 'scrollbar'
  document.body.appendChild(outer)

  const inner = document.createElement('div')
  outer.appendChild(inner)

  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth)

  outer.parentNode.removeChild(outer)

  return scrollbarWidth
}

const scrollBar = getScrollbarWidth()
html.style.setProperty('--scrollBar', scrollBar + 'px')


// Swiper
Swiper.use([Navigation, Pagination, Scrollbar])

const swiper3 = new Swiper('.swiper-residential', {

  freeMode: true,
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 25
    }, 
    1300: {
      slidesPerView: 3,
      spaceBetween: 25,
    }
  }
})
const swiper2 = new Swiper('.swiper-count-arrows', {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})

const mySwiper = new Swiper('.js-swiper-video', {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})

if (mySwiper) {
  mySwiper.on('slideChange', function () {
    const isVideoStart = mySwiper.slides[mySwiper.realIndex].querySelector('.video-container')
    const isVideo = mySwiper.slides[mySwiper.previousIndex].querySelector('.video-container')
    if (isVideoStart) {
      YT.get(isVideoStart.querySelector('iframe').id).playVideo()
    }
    if (isVideo) {
      YT.get(isVideo.querySelector('iframe').id).stopVideo()
    }
  })
}




const swiper = new Swiper(".swiper-dots", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    preventClicks: true
  },
})



//horizontal scroll
const slider = document.querySelector('.scroll-x')
let isDown = false
let startX, scrollLeft
if (slider) {
  slider.addEventListener('mousedown', (e) => {
    isDown = true
    slider.classList.add('active')
    startX = e.pageX - slider.offsetLeft
    scrollLeft = slider.scrollLeft
  })
  slider.addEventListener('mouseleave', () => {
    isDown = false
    slider.classList.remove('active')
  })
  slider.addEventListener('mouseup', () => {
    isDown = false
    slider.classList.remove('active')
  })
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - slider.offsetLeft
    const walk = (x - startX) * 3
    slider.scrollLeft = scrollLeft - walk
  })
}






// youtube player 
const initPlayer = function (element) {
  var player = element.querySelector('.video-iframe')
  var button = element.querySelector('.video-play')
  var ytplayer = new YT.Player(player, {
    playerVars: {
      'autoplay': 0,
      'modestbranding': 1,
      'controls': 0,
      'rel': 0,
    },
    videoId: element.dataset.id
  })

  button.addEventListener('click', function () {
    switch (ytplayer.getPlayerState()) {
      case 1:
        ytplayer.stopVideo()
        break
      default:
        ytplayer.playVideo()
        break
    }
  })
}

window.onYouTubePlayerAPIReady = function () {
  var container = document.querySelectorAll('.video-container')
  for (let i = 0; i < container.length; i++) {
    initPlayer(container[i])
  }
}




// file-upload get name of file
const fullPath = document.getElementById('file-upload');
if (fullPath) {
  fullPath.addEventListener('change', () => {
    if (fullPath) {
      var startIndex = (fullPath.value.indexOf('\\') >= 0 ? fullPath.value.lastIndexOf('\\') : fullPath.value.lastIndexOf('/'));
      var filename = fullPath.value.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      // console.log(filename)
      document.querySelector('.file-upload-text').innerHTML = filename
    }
  })
}

const fullPath2 = document.getElementById('file-upload-2');
if (fullPath2) {
  fullPath2.addEventListener('change', () => {
    if (fullPath2) {
      var startIndex = (fullPath2.value.indexOf('\\') >= 0 ? fullPath2.value.lastIndexOf('\\') : fullPath2.value.lastIndexOf('/'));
      var filename = fullPath.value.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      // console.log(filename)
      document.querySelector('.file-upload-text-2').innerHTML = filename
    }
  })
}


// sticky header
const phoneIconMobile = document.querySelector('.js-phone-icon.show-mobile')
const phoneIconDesktop = document.querySelector('.js-phone-icon.show-desktop')
const userIconMobile = document.querySelector('.js-user-icon.show-mobile')
const userIconDesktop = document.querySelector('.js-user-icon.show-desktop')

function stickyHeader() {
  if (window.pageYOffset > newHeight / 4) {
    if (headerTop.classList.contains('header-top--main')){
      headerTop.classList.add('fixed')
      headerTop.classList.remove('header-top--white')
  
      if (!headerTop.classList.contains('fixed')) {
  
        phoneIconMobile.setAttribute('style', 'display: none')
        phoneIconDesktop.setAttribute('style', 'display: flex')
  
        userIconMobile.setAttribute('style', 'display: none')
        userIconDesktop.setAttribute('style', 'display: flex')
  
      } else {
  
        phoneIconMobile.setAttribute('style', 'display: flex')
        phoneIconDesktop.setAttribute('style', 'display: none')
  
        userIconMobile.setAttribute('style', 'display: flex')
        userIconDesktop.setAttribute('style', 'display: none')
      }
    }
  } else {
    if (headerTop.classList.contains('header-top--main')) {
      headerTop.classList.remove('fixed')
      headerTop.classList.add('header-top--white')
      if (headerTop.classList.contains('fixed')) {
  
        phoneIconMobile.setAttribute('style', 'display: flex')
        phoneIconDesktop.setAttribute('style', 'display: none')
  
        userIconMobile.setAttribute('style', 'display: flex')
        userIconDesktop.setAttribute('style', 'display: none')
  
      } else {
  
        phoneIconMobile.setAttribute('style', 'display: none')
        phoneIconDesktop.setAttribute('style', 'display: flex')
  
        userIconMobile.setAttribute('style', 'display: none')
        userIconDesktop.setAttribute('style', 'display: flex')
  
      }
    }
  }
}

stickyHeader()
window.onscroll = function() {stickyHeader()}



// video play
const video = document.querySelector('.rc-video')
const playBtn = document.querySelector('.play')
if (playBtn) {
  playBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play()
      playBtn.classList.add('hide')
    } else {
      video.pause()
      playBtn.classList.remove('hide')
    }
  })
}


// vacancy form
const vacancyBtn = document.querySelector('.vacancy-request')
const vacancyForm = document.querySelector('.vacancy-form')

if (vacancyBtn) {
  vacancyBtn.addEventListener('click', () => {
    vacancyBtn.setAttribute('style', 'display: none;')
    vacancyForm.classList.add('show')
  })
}