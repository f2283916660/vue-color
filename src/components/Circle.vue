<template>
  <div role="application" aria-label="Sketch color picker"
       :class="['vc-circle', disableAlpha ? 'vc-circle__disable-alpha' : '']">
    <div class="vc-circle-wrap">
      <hueCircle v-model="colors" @change="childChange"></hueCircle>
      <!-- <saturation v-model="colors" @change="childChange"></saturation> -->
    </div>
    <div class="vc-circle-controls">
      <div class="vc-circle-sliders">
        <div class="vc-circle-hue-wrap">
          <!-- foreground="rgba(0, 0, 255, .5)" -->
          <range v-model="colors.hsv.v" :max="1" @change="childChange(null)" :background="backgroundV">
            <div class="vc-range-picker" slot="picker">
              <span class="vc-range-picker-color" :style="{background: 'rgb('+colors.rgba.r+', '+colors.rgba.g+', '+colors.rgba.b+')'}"></span>
            </div>
          </range>
        </div>
        <div class="vc-circle-alpha-wrap" v-if="!disableAlpha">
          <range v-model="colors.a" :max="1" @change="childChange(null)" :show-transparent="true"
                 :background="'linear-gradient(to right, rgba(255,255,255, 0) 0%, rgba('+colors.rgba.r+', '+colors.rgba.g+', '+colors.rgba.b+', 1)'">
            <div class="vc-range-picker" slot="picker">
              <span class="vc-range-picker-color" :style="{background: activeColor}"></span>
            </div>
          </range>
        </div>
      </div>
      <div class="vc-circle-color-wrap">
        <div :aria-label="`Current color is ${activeColor}`" class="vc-circle-active-color"
             :style="{background: activeColor}"></div>
        <checkboard></checkboard>
      </div>
    </div>
    <div class="vc-circle-field" v-if="!disableFields">
      <!-- rgba -->
      <div class="vc-circle-field--double">
        <ed-in label="hex" :value="hex" @change="inputChange"></ed-in>
      </div>
      <div class="vc-circle-field--single">
        <ed-in label="h" :value="colors.hsv.h" @change="inputChange"></ed-in>
      </div>
      <div class="vc-circle-field--single">
        <ed-in label="s" :value="colors.hsv.s" @change="inputChange"></ed-in>
      </div>
      <div class="vc-circle-field--single">
        <ed-in label="v" :value="colors.hsv.v" @change="inputChange"></ed-in>
      </div>
      <div class="vc-circle-field--single" v-if="!disableAlpha">
        <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
      </div>
    </div>
    <div class="vc-circle-presets" role="group" aria-label="A color preset, pick one to set as current color">
      <template v-for="c in presetColors">
        <div
            v-if="!isTransparent(c)"
            class="vc-circle-presets-color"
            :aria-label="'Color:' + c"
            :key="c"
            :style="{background: c}"
            @click="handlePreset(c)">
        </div>
        <div
            v-else
            :key="c"
            :aria-label="'Color:' + c"
            class="vc-circle-presets-color"
            @click="handlePreset(c)">
          <checkboard/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import tinycolor from 'tinycolor2'

  import colorMixin from '../mixin/color'
  import editableInput from './common/EditableInput.vue'
  import saturation from './common/Saturation.vue'
  import hue from './common/Hue.vue'
  import hueCircle from './common/HueCircle.vue'
  import alpha from './common/Alpha.vue'
  import checkboard from './common/Checkboard.vue'
  import range from './common/range.vue'

  // const presetColors = [
  //   '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
  //   '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
  //   '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
  //   'rgba(0,0,0,0)'
  // ]

  export default {
    name: 'CirclePicker',
    mixins: [colorMixin],
    components: {
      saturation,
      hue,
      hueCircle,
      alpha,
      'ed-in': editableInput,
      checkboard,
      range
    },
    props: {
      presetColors: {
        type: Array
        // default () {
        //   return presetColors
        // }
      },
      disableAlpha: {
        type: Boolean,
        default: false
      },
      disableFields: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      hex () {
        let hex
        if (this.colors.a < 1) {
          hex = this.colors.hex8
        } else {
          hex = this.colors.hex
        }
        return hex.replace('#', '')
      },
      activeColor () {
        var rgba = this.colors.rgba
        return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
      },
      backgroundV () {
        var hsv = this.colors.hsv
        var color = tinycolor(`hsv ${hsv.h} ${hsv.s} 1`)
        return 'linear-gradient(to right, rgb(0,0,0) 0%, rgb(' + [parseInt(color._r), parseInt(color._g), parseInt(color._b)].join(',') + ') 100%)'
      }
    },
    methods: {
      handlePreset (c) {
        this.colorChange({
          hex: c,
          source: 'hex'
        })
      },
      childChange (data) {
        if (!data) {
          data = {
            h: this.colors.hsv.h,
            s: this.colors.hsv.s,
            v: this.colors.hsv.v,
            a: this.colors.a,
            source: 'hsv'
          }
        }
        this.colorChange(data)
      },
      inputChange (data) {
        if (!data) {
          return
        }
        if (data.hex) {
          this.isValidHex(data.hex) && this.colorChange({
            hex: data.hex,
            source: 'hex'
          })
        } else if (data.h || data.s || data.v || data.a) {
          this.colorChange({
            h: data.h || this.colors.hsv.h,
            s: data.s || this.colors.hsv.s,
            v: data.v || this.colors.hsv.v,
            a: data.a || this.colors.a,
            source: 'hsv'
          })
        }
      }
    }
  }
</script>

<style>
  .vc-circle {
    position: relative;
    width: 200px;
    padding: 10px 10px 0;
    box-sizing: initial;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .15), 0 8px 16px rgba(0, 0, 0, .15);
  }

  .vc-circle-wrap {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    overflow: hidden;
  }

  .vc-circle-controls {
    display: flex;
  }

  .vc-circle-sliders {
    padding: 4px 0;
    flex: 1;
  }

  .vc-circle-sliders .vc-hue,
  .vc-circle-sliders .vc-alpha-gradient {
    border-radius: 2px;
  }

  .vc-circle-hue-wrap {
    position: relative;
  }

  .vc-circle-alpha-wrap {
    position: relative;
    margin-top: 4px;
    overflow: hidden;
  }

  .vc-circle-color-wrap {
    width: 24px;
    height: 48px;
    position: relative;
    margin-top: 4px;
    margin-left: 4px;
    border-radius: 3px;
  }

  .vc-circle-active-color {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 2px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15), inset 0 0 4px rgba(0, 0, 0, .25);
    z-index: 2;
  }

  .vc-circle-color-wrap .vc-checkerboard {
    background-size: auto;
  }

  .vc-circle-field {
    display: flex;
    padding-top: 4px;
  }

  .vc-circle-field .vc-input__input {
    width: 90%;
    padding: 4px 0 3px 10%;
    border: none;
    box-shadow: inset 0 0 0 1px #ccc;
    font-size: 10px;
  }

  .vc-circle-field .vc-input__label {
    display: block;
    text-align: center;
    font-size: 11px;
    color: #222;
    padding-top: 3px;
    padding-bottom: 4px;
    text-transform: capitalize;
  }

  .vc-circle-field--single {
    flex: 1;
    padding-left: 6px;
  }

  .vc-circle-field--double {
    flex: 2;
  }

  .vc-circle-presets {
    margin-right: -10px;
    margin-left: -10px;
    padding-left: 10px;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  .vc-circle-presets-color {
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    display: inline-block;
    margin: 0 10px 10px 0;
    vertical-align: top;
    cursor: pointer;
    width: 16px;
    height: 16px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);
  }

  .vc-circle-presets-color .vc-checkerboard {
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);
    border-radius: 3px;
  }

  .vc-circle__disable-alpha .vc-circle-color-wrap {
    height: 10px;
  }
</style>
