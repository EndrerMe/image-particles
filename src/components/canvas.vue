<template>
    <div class="canvasComponent">
        <canvas id='canvas' ref='canvas'></canvas>
    </div>
</template>

<script>
import imageFile from '!raw-loader!@/assets/image.txt'

export default {
    name: 'canvasComponent',
    data() {
        return {
            canvas: {},
            context: {},
            png: {},
            particles: [],
            isImageDone: false,
            interval: null,
            pxPerOneInterval: 4,
            windowWidth: window.innerWidth,
        }
    },
    mounted() {
        this.canvas = this.$refs['canvas'];
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.loadImage();
    },
    methods: {
        loadImage() {
            this.png = new Image();
            this.png.src = `data:image/png;base64, ${imageFile}`
            this.png.onLoad = this.drawScene();
        },

        drawScene() {
            this.context.drawImage(this.png, 0, 0);

            const data = this.context.getImageData(-this.canvas.width / 2 + this.png.height, -this.canvas.height / 2 + this.png.height, this.canvas.width, this.canvas.height);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (let y = 0, y2 = data.height; y < y2; y++) {
                for (let x = 0, x2 = data.width; x < x2; x++) {
                    const pos = [(y - 1) * this.canvas.width + (x - 1)] * 4;
                    if (data.data[(x * 4 + y * 4 * data.width) + 3] > 128) {
                        const particle = {
                            x : x,
                            y : y,
                            direction: Math.floor(Math.random() * 8),
                            step: Math.floor(Math.random() * 135),
                            stepCount: 0,
                            speed: 4,
                            isOnX: false,
                            isOnY: false,
                            fillStyle: 'rgba('+data.data[pos]+','+(data.data[pos+1])+','+(data.data[pos+2])+','+(data.data[pos+3])+')'
                        };
                        this.particles.push(particle);
                    }
                }
            }
        
            this.particlesStartPos();
        },

        particlesStartPos() {
            for(let i = 0; i < this.particles.length; i++){
                // this.randomY(0, 1)
                this.context.fillStyle = this.particles[i].fillStyle;
                this.particles[i].startX = this.randomX(0, this.windowWidth);
                this.context.fillRect(this.particles[i].startX, this.canvas.height - 5, 1, 1);
                this.particles[i].startY = this.canvas.height - 5;
            }
            this.interval = setInterval(this.particlesAnim, 10);
        },

        randomX (min, max){
            return Math.floor(min + Math.random() * (max-min));
        },

        // randomY(min, max) {
        //     const side = Math.round(Math.random() * (max - min) + min);
            
        //     if 
        // },

        particlesAnim() {
            const rect = this.canvas.getBoundingClientRect();
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            for (let i = 0; i < this.particles.length; i++) {
                const particle = this.particles[i];

                if (particle.isOnTruePx) {
                    this.context.fillStyle = particle.fillStyle;
                    this.context.fillRect(particle.startX, particle.startY, 1, 1);
                    continue;
                }

                const angleRad = Math.atan2(particle.y - rect.top - particle.startY, particle.x - rect.left - particle.startX);
                this.particles[i].direction = Math.atan2( (Math.sin(particle.direction) + Math.sin(angleRad) ),
                                    (Math.cos(particle.direction) + Math.cos(angleRad) ));
                

                const addX = Math.cos(this.particles[i].direction) * particle.speed;
                const addY = Math.sin(this.particles[i].direction) * particle.speed;

                if (!particle.isOnY) {
                    particle.startY = particle.startY + addY;
                }

                if (!particle.isOnX) {
                    particle.startX = particle.startX + addX;
                }

                this.context.fillStyle = particle.fillStyle;
                this.context.fillRect(particle.startX, particle.startY, 1, 1);

                if (particle.startY <= particle.y) {
                    particle.speed = 1;
                }

                if (Math.round(particle.startY) === particle.y) {
                    particle.isOnY = true;
                }

                if (Math.round(particle.startX) === particle.x) {
                    particle.isOnX = true;
                }
            }
        },

    },
}
</script>

<style scoped>

</style>