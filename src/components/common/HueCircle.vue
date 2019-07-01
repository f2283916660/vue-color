<template>
  <div class="vc-huecircle" :style="{top: pointerSize+'px',bottom: pointerSize+'px',left: pointerSize+'px',right: pointerSize+'px'}"
       ref="container"
       @mousedown="handleMouseDown"
       @touchmove="handleChange"
       @touchstart="handleChange">
    <div class="vc-huecircle-pointer" :style="{top: pointerTop, left: pointerLeft}">
      <div class="vc-huecircle-picker" :style="{width: pointerSize+'px', height: pointerSize+'px'}"></div>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      value: Object,
      pointerSize: {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        wrapR: 0
      }
    },
    computed: {
      colors () {
        return this.value
      },
      pointerTop () {
        return this.getPointerXY().y + 'px'
      },
      pointerLeft () {
        return this.getPointerXY().x + 'px'
      }
    },
    methods: {
      getPointerXY () {
        let hsv = this.colors.hsv
        let container = this.$refs.container
        if (!container && !this.wrapR) {
          return {x: 0, y: 0}
        }
        let containerWidth = container.clientWidth
        let containerHeight = container.clientHeight

        let r = hsv.s * containerHeight / 2
        let pX = containerWidth / 2 + r * Math.cos((hsv.h / 360) * 2 * Math.PI)
        let pY = containerHeight / 2 - r * Math.sin((hsv.h / 360) * 2 * Math.PI)

        return {x: pX, y: pY}
      },
      handleChange (e, skip) {
        !skip && e.preventDefault()

        var container = this.$refs.container
        var containerWidth = container.clientWidth
        var containerHeight = container.clientHeight

        var xOffset = container.getBoundingClientRect().left + window.pageXOffset
        var yOffset = container.getBoundingClientRect().top + window.pageYOffset
        var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
        var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0)
        var left = pageX - xOffset
        var top = pageY - yOffset

        let originPointX = containerWidth / 2
        let originPointY = containerHeight / 2
        // 半径r
        let r = Math.sqrt(Math.pow(left - originPointX, 2) + Math.pow(top - originPointY, 2))
        // 计算角度
        let angle = Math.acos((left - originPointX) / r)

        if (top - originPointY > 0) {
          angle = Math.PI * 2 - angle
        }

        let hsvH = 360 * angle / (Math.PI * 2)
        let hsvS = r / originPointX
        hsvS = hsvS > 1 ? 1 : hsvS

        let hsV = this.colors.hsv.v
        this.$emit('change', {
          h: hsvH,
          s: hsvS,
          v: hsvS && !hsV ? 1 : hsV,
          a: this.colors.hsv.a,
          source: 'hsv'
        })
      },
      handleMouseDown (e) {
        this.handleChange(e, true)
        window.addEventListener('mousemove', this.handleChange)
        window.addEventListener('mouseup', this.handleMouseUp)
      },
      handleMouseUp (e) {
        this.unbindEventListeners()
      },
      unbindEventListeners () {
        window.removeEventListener('mousemove', this.handleChange)
        window.removeEventListener('mouseup', this.handleMouseUp)
      }
    },
    mounted () {
      let container = this.$refs.container
      this.wrapR = container.clientWidth
    }
  }
</script>

<style>
  .vc-huecircle {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 2px;
    background: url("./bgcolor.png") no-repeat center center;
    background-size: 100% 100%;
  }

  .vc-huecircle-container {
    cursor: pointer;
    margin: 0 2px;
    position: relative;
    height: 100%;
  }

  .vc-huecircle-pointer {
    z-index: 2;
    position: absolute;
  }

  .vc-huecircle-picker {
    cursor: pointer;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
    background: #fff;
    transform: translate(-50%, -50%);
  }
</style>
