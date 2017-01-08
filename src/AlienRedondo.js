
var AlienRedondo = cc.Class.extend({
    gameLayer:null,
    sprite:null,
    shape:null,
    color:null,
    vida:null,
    eliminado:false,
    ctor:function(gameLayer, posicion) {

        this.gameLayer = gameLayer;
        this.vida = 1000;

        // Crear Sprite - Cuerpo y forma
        var aleatorio = Math.floor(Math.random() * 3);
        switch(aleatorio) {
            case 0:
                this.sprite = new cc.PhysicsSprite(res.alienBeige_round);
                break;
            case 1:
                this.sprite = new cc.PhysicsSprite(res.alienBlue_round);
                break;
            case 2:
                this.sprite = new cc.PhysicsSprite(res.alienGreen_round);
                break;
            case 3:
                this.sprite = new cc.PhysicsSprite(res.alienPink_round);
                break;
            default:
                this.sprite = new cc.PhysicsSprite(res.alienYellow_round);
                break;
        }
        var body = new cp.Body(1, cp.momentForCircle(1, 0, this.sprite.width/2, cp.vzero));
        console.log(this.sprite.width/2);
        body.setPos(posicion);
        this.shape = new cp.CircleShape(body,
                this.sprite.getContentSize().width/2, cp.vzero);
        this.shape["object"] = this;
        this.shape.setFriction(1);
        this.shape.setCollisionType(tipoObjeto);
        // forma dinamica
        this.gameLayer.space.addBody(body);
        this.sprite.setBody(body);
        this.shape.setCollisionType(tipoAlien);
        console.log(this.sprite);
        this.gameLayer.space.addShape(this.shape);
        // añadir sprite a la capa
        this.gameLayer.addChild(this.sprite, 10);
    }
});