var formaRectanguloTumbado = 1;
var formaCuadrado = 2;

var Objeto = cc.Class.extend({
    gameLayer:null,
    sprite:null,
    shape:null,
    tipo:null,
    forma:null,
    vida:null,
    eliminado:false,
    ctor:function(gameLayer, posicion, tipo, forma) {

        this.forma = forma;
        this.tipo = tipo;
        this.vida = 1200;
        this.gameLayer = gameLayer;

        // Crear Sprite - Cuerpo y forma
        this.cargarSprite();
        this.sprite.setScaleX(0.5);
        this.sprite.setScaleY(0.5);
        this.cargarBody();
        this.body.setPos(posicion);
        this.sprite.setBody(this.body);
        this.gameLayer.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body,
                this.sprite.getContentSize().width * this.sprite.getScaleX(),
                this.sprite.getContentSize().height * this.sprite.getScaleY());
        this.shape["object"] = this;
        this.shape.setFriction(1);
        this.shape.setCollisionType(tipoObjeto);
        // forma dinamica
        this.gameLayer.space.addShape(this.shape);
        // añadir sprite a la capa
        this.gameLayer.addChild(this.sprite, 10);

    }, cargarSprite:function() {
        switch(this.tipo) {
            case tipoCristal:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        this.sprite = new cc.PhysicsSprite(res.glass11);
                        break;
                    case formaCuadrado:
                        this.sprite = new cc.PhysicsSprite(res.glass21);
                        break;
                }
                break;
            case tipoMadera:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        this.sprite = new cc.PhysicsSprite(res.wood11);
                        break;
                    case formaCuadrado:
                        this.sprite = new cc.PhysicsSprite(res.wood21);
                        break;
                }
                break;
            case tipoPiedra:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        this.sprite = new cc.PhysicsSprite(res.stone11);
                        break;
                    case formaCuadrado:
                        this.sprite = new cc.PhysicsSprite(res.stone21);
                        break;
                }
                break;
        }
    }, cargarBody:function() {
        switch(this.tipo) {
            case tipoCristal:
                this.body = new cp.Body(1, cp.momentForBox(1,
                            this.sprite.getContentSize().width,
                            this.sprite.getContentSize().height));
                break;
            case tipoMadera:
                this.body = new cp.Body(1.5, cp.momentForBox(1,
                            this.sprite.getContentSize().width,
                            this.sprite.getContentSize().height));
                break;
            case tipoPiedra:
                this.body = new cp.Body(2, cp.momentForBox(1,
                            this.sprite.getContentSize().width,
                            this.sprite.getContentSize().height));
                break;
        }
    }, colision:function(fuerza) {
        if (Math.abs(fuerza) < 150) return;
        switch(this.tipo) {
            case tipoCristal:
                this.vida -= fuerza * 1.5;
                break;
            case tipoMadera:
                this.vida -= fuerza * 1;
                break;
            case tipoPiedra:
                this.vida -= fuerza * .5;
                break;
        }
        this.actualizarEstado();
    }, actualizarEstado:function() {
        if (this.vida > 800)
            this.cargarEstadoIntacto();
        else if (this.vida > 400)
            this.cargarEstadoMedioRoto();
        else if (this.vida > 0)
            this.cargarEstadoRoto();
        else
            this.destruido();
    }, cargarEstadoIntacto:function() {
        var newSprite;
        switch(this.tipo) {
            case tipoCristal:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        newSprite = new cc.PhysicsSprite(res.glass11);
                        break;
                    case formaCuadrado:
                        newSprite = new cc.PhysicsSprite(res.glass21);
                        break;
                }
                break;
            case tipoMadera:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        newSprite = new cc.PhysicsSprite(res.wood11);
                        break;
                    case formaCuadrado:
                        newSprite = new cc.PhysicsSprite(res.wood21);
                        break;
                }
                break;
            case tipoPiedra:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        newSprite = new cc.PhysicsSprite(res.stone11);
                        break;
                    case formaCuadrado:
                        newSprite = new cc.PhysicsSprite(res.stone21);
                        break;
                }
                break;
        }
        this.cambiarSprite(newSprite);
    }, cargarEstadoMedioRoto:function() {
        var newSprite;
        switch(this.tipo) {
            case tipoCristal:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        newSprite = new cc.PhysicsSprite(res.glass12);
                        break;
                    case formaCuadrado:
                        newSprite = new cc.PhysicsSprite(res.glass22);
                        break;
                }
                break;
            case tipoMadera:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        newSprite = new cc.PhysicsSprite(res.wood12);
                        break;
                    case formaCuadrado:
                        newSprite = new cc.PhysicsSprite(res.wood22);
                        break;
                }
                break;
            case tipoPiedra:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        newSprite = new cc.PhysicsSprite(res.stone12);
                        break;
                    case formaCuadrado:
                        newSprite = new cc.PhysicsSprite(res.stone22);
                        break;
                }
                break;
        }
        this.cambiarSprite(newSprite);
    }, cambiarSprite:function(newSprite) {
        newSprite.setScaleX(0.5);
        newSprite.setScaleY(0.5);
        newSprite.setBody(this.sprite.body);
        this.gameLayer.removeChild(this.sprite);
        this.gameLayer.addChild(newSprite);
        this.sprite = newSprite;
    }, cargarEstadoRoto:function() {
        var newSprite;
        switch(this.tipo) {
            case tipoCristal:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        newSprite = new cc.PhysicsSprite(res.glass13);
                        break;
                    case formaCuadrado:
                        newSprite = new cc.PhysicsSprite(res.glass23);
                        break;
                }
                break;
            case tipoMadera:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        newSprite = new cc.PhysicsSprite(res.wood13);
                        break;
                    case formaCuadrado:
                        newSprite = new cc.PhysicsSprite(res.wood23);
                        break;
                }
                break;
            case tipoPiedra:
                switch(this.forma) {
                    case formaRectanguloTumbado:
                        newSprite = new cc.PhysicsSprite(res.stone13);
                        break;
                    case formaCuadrado:
                        newSprite = new cc.PhysicsSprite(res.stone23);
                        break;
                }
                break;
        }
        this.cambiarSprite(newSprite);
    }, destruido:function() {
        if (!this.eliminado) {
            this.gameLayer.eliminarObjeto(this);
            this.eliminado = true;
        }
    }
});