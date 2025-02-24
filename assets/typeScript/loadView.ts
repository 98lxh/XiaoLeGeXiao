import { _decorator, Component, director, Node, profiler, ProgressBar, Slider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loadView')
export class loadView extends Component {
   // 进度条
   @property(ProgressBar) progre: ProgressBar = null
   //滑动器节点
   @property(Slider) sli: Slider = null
   start() {
       profiler.hideStats();
       this.startJindu()
   }
   protected onDestroy(): void {
       this.unscheduleAllCallbacks()
   }
   /**
  * 进度条进度
  */
   startJindu() {
       this.progre.progress = 0;
       this.sli.progress = 0;
       // 将在 10 秒后开始计时，每 5 秒执行一次回调，重复 3 + 1 次
       this.schedule(() => {
           this.progre.progress += 0.1;
           this.sli.progress += 0.1;
           if (this.progre.progress >= 0.5) {
               this.unschedule(this.schedule)
               this.jinduPause()
           }
       }, 0.1, 4, 0.05);
   }
   jinduPause() {
       this.scheduleOnce(() => {
           this.loadScene()
       }, 0.8)
   }
   loadScene() {
       this.schedule(() => {
           if (this.progre.progress >= 0.9) {
               this.progre.progress = 1;
               this.sli.progress = 1;
               this.unschedule(this.schedule)
               director.loadScene("game")
               return
           }
           this.progre.progress += 0.1;
           this.sli.progress += 0.1;
       }, 0.1, 5, 0.2);
   }
}