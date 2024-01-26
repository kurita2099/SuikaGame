class Example extends Phaser.Scene
{
    preload ()
    {
        //  Load sprite sheet generated with TexturePacker
        this.load.atlas('sheet', 'assets/physics/fruit-sprites.png', 'assets/physics/fruit-sprites.json');

        //  Load body shapes from JSON file generated using PhysicsEditor
        this.load.json('shapes', 'assets/physics/fruit-shapes.json');
    }

    create ()
    {
        this.matter.world.setBounds(0, 0, 600, 800);

        const shapes = this.cache.json.get('shapes');

        this.add.image(0, 0, 'sheet', 'background').setOrigin(0, 0);

        const ground = this.matter.add.sprite(0, 0, 'sheet', 'ground', { shape: shapes.ground });

        this.matter.alignBody(ground, 300, 800, Phaser.Display.Align.BOTTOM_CENTER);

        this.matter.add.sprite(200, 50, 'sheet', 'crate', { shape: shapes.crate });
        this.matter.add.sprite(250, 250, 'sheet', 'orange', { shape: shapes.banana });
        this.matter.add.sprite(360, 50, 'sheet', 'banana', { shape: shapes.orange });
        this.matter.add.sprite(400, 250, 'sheet', 'banana', { shape: shapes.cherries });

        const shapeKeys = [ 'crate', 'banana', 'orange', 'cherries' ];
        let fruitname ='orange';
        const fruit_ = this.add.sprite(0, 20, 'sheet', fruitname).setScale(0.3);
        this.input.on('pointerdown', function (pointer)
        {
            

            this.matter.add.image(fruit_.x, fruit_.y+50, 'sheet', fruitname, { shape: shapes[fruitname] });
            fruitname = Phaser.Utils.Array.GetRandom(shapeKeys);
            fruit_.setTexture('sheet', fruitname);

        }, this);
        this.input.on('pointermove', function (pointer)
        {
            fruit_.x = pointer.x;
        }, this);
        this.matter.world.on('collisionstart', function (event) {
              event.pairs.forEach(function(item){
                    if(item.bodyA.label == item.bodyB.label){
                        alert(item.bodyA.label);
                    }                 
              });
        },this)

    }
}

/*
 *  This example show how to load complex shapes created with PhysicsEditor (https://www.codeandweb.com/physicseditor)
 */

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 600,
    height: 800,
    scene: Example,
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    }
};

const game = new Phaser.Game(config);
