<template>
  <div class="vc-range">
    <div class="vc-range-checkboard-wrap" v-if="showTransparent">
      <checkboard :size="10"></checkboard>
    </div>
    <div class="vc-range-gradient" v-show="background" :style="{background: background}"></div>
    <div class="vc-range-container" ref="container"
         @mousedown="handleMouseDown"
         @touchmove="handleChange"
         @touchstart="handleChange">
      <div class="vc-range-foreground" v-if="foreground" :style="{background: foreground, width:percent+'%'}"></div>
      <div class="vc-range-pointer" :style="{left: percent + '%'}">
        <slot name="picker">
          <div class="vc-range-picker">
            <span class="vc-range-picker-color" :style="{background:'rgba(255,10,0,' + currValue + ')'}"></span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import checkboard from './Checkboard.vue'

  export default {
    name: 'range',
    props: {
      value: Number,
      onChange: Function,
      max: {
        default: 100,
        type: Number
      },
      min: {
        default: 0,
        type: Number
      },
      step: {
        default: 0,
        type: Number
      },
      showTransparent: false,
      background: String,
      foreground: String
    },
    data () {
      return {
        currValue: 0
      }
    },
    components: {
      checkboard
    },
    computed: {
      percent () {
        let val
        if (this.currValue == null) {
          return 0
        } else if (this.currValue <= this.min) {
          val = 0
        } else if (this.currValue >= this.max) {
          val = 1
        } else {
          val = (this.currValue - this.min) / (this.max - this.min)
        }
        return val * 100
      }
    },
    watch: {
      value () {
        this.valueChange()
      }
    },
    methods: {
      valueChange () {
        if (this.value < this.min) {
          this.$emit('input', this.min)
        } else if (this.value > this.max) {
          this.$emit('input', this.max)
        } else {
          this.currValue = this.value
        }
      },
      handleChange (e, skip) {
        !skip && e.preventDefault()
        var container = this.$refs.container
        var containerWidth = container.clientWidth

        var xOffset = container.getBoundingClientRect().left + window.pageXOffset
        var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
        var left = pageX - xOffset

        var val
        if (left < 0) {
          val = 0
        } else if (left > containerWidth) {
          val = 1
        } else {
          val = left * 100 / containerWidth / 100
        }
        val = (this.max - this.min) * val + this.min
        if (this.step) {
          var minor = val % this.step
          val = parseInt(val / this.step) * this.step + (minor / this.step > 0.5 ? this.step : 0)
        }
        val = val.toFixed(5) - 0

        if (this.currValue !== val) {
          console.log('change--2', val)
          this.currValue = val
          this.$emit('input', val)
          this.$emit('change', val)
        }
      },
      handleMouseDown (e) {
        this.handleChange(e, true)
        window.addEventListener('mousemove', this.handleChange)
        window.addEventListener('mouseup', this.handleMouseUp)
      },
      handleMouseUp () {
        this.unbindEventListeners()
      },
      unbindEventListeners () {
        window.removeEventListener('mousemove', this.handleChange)
        window.removeEventListener('mouseup', this.handleMouseUp)
      }
    },
    created () {
      this.valueChange()
    }

  }

</script>

<style>
  body{
    background: #fff;
  }
  .vc-range {
    position: relative;
    font-size: 20px;
    height: 1em;
    box-shadow: 0 0 .5px 0 rgba(0, 0, 0, .8);
    border-radius: 50px;
  }

  .vc-range-checkboard-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    border-radius: 50px;
  }

  .vc-range-gradient {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50px;
  }

  .vc-range-foreground {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -0.5em;
    border: .5em solid transparent;
    box-sizing: content-box;
    border-radius: 50px;
  }

  .vc-range-container {
    cursor: pointer;
    position: relative;
    z-index: 2;
    height: 100%;
    margin: 0 .5em;
  }

  .vc-range-pointer {
    position: absolute;
    z-index: 2;
    height: 1em;
  }

  .vc-range-picker {
    position: relative;
    top: 50%;
    left: 0;
    width: .84em;
    height: .84em;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, .6);
    background: #fff;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vc-range-picker-color {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
  }
</style>
