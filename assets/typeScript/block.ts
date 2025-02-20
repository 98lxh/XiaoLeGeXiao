import { _decorator, Component, Node, UITransform, Rect, SpriteFrame, Sprite, tween, Vec3 } from 'cc';

@_decorator.ccclass('block')
export class block extends Component {

    @_decorator.property({type: Node})
    nodeShadow = null

    @_decorator.property({type: Sprite})
    element = null

    @_decorator.property({type: [SpriteFrame]})
    elements = []

    isCanTouch: boolean;
    elementType: any;


    is_di: boolean;
    numDi: number;
    isEliminate: boolean;
    isMoving: boolean;
    v3BlockOld: Vec3;

    start() {}

    init(type){
        this.node.scale = new Vec3(1,1,1)
        this.elementType = type //0-29
        this.isCanTouch = true
        this.is_di = false
        this.element.spriteFrame = this.elements[this.elementType]
    }

    initDi(type){
        this.node.scale = new Vec3(1, 1, 1)
        this.v3BlockOld = new Vec3(0, 0, 0)
        this.isMoving = true
        this.isEliminate = false
        this.numDi = -1
        this.elementType = type //0-29
        this.isCanTouch = false
        this.is_di = true
        this.nodeShadow.active = false
        this.element.spriteFrame = this.elements[this.elementType]
    }

    shuaXinBlockSPF(type){
        this.elementType = type
        tween(this.element.node)
            .to(0.1,{scale:new Vec3(0,0,0)})
            .call(()=>{
                this.element.spriteFrame = this.elements[this.elementType]
            })
            .to(0.1,{scale:new Vec3(0.7,0.7,0.7)})
            .start()
    }

    setTouch(can_touch){
        this.isCanTouch = can_touch

        if (this.isCanTouch) {
            this.nodeShadow.active = false
        }else{
            this.nodeShadow.active = true
        }
    }

    getBoundingBox(){
        let num_pz = 5
        let node_UITransform_1 = this.node.getComponent(UITransform)
        let rect_1 = node_UITransform_1.getBoundingBox()
        let rect_3 = new Rect(rect_1.x + num_pz,rect_1.y + num_pz,rect_1.width-num_pz*2,rect_1.height-num_pz*2)
        return rect_3
    }

    
    update(deltaTime: number) {
        
    }
}

