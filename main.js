import { Application, Sprite } from "./pixi.mjs";

export async function runApp() {
    // Initialize PIXI Application within an IIFE
    (async () => {
        const app = new Application();
        await app.init({
            resizeTo: window,
            backgroundColor: 0x1099bb,
        });

        document.getElementById('canvas-container').appendChild(app.canvas);

        let appSprite;

        // Listen for image input changes
        document.getElementById('image-input').addEventListener('change', onImageSelected);

        async function onImageSelected(event) {
            // Remove existing sprite if any
            if (appSprite) {
                console.log('Removing existing sprite');
                app.stage.removeChild(appSprite);
                appSprite.destroy(true);
            }

            const file = event.target.files[0];
            if (!file) return;

            // Create a new sprite from the selected image
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.src = url;
            img.onload = async () => {
                appSprite = Sprite.from(img);

                // center the sprite on the screen
                appSprite.anchor.set(0.5);
                appSprite.x = app.screen.width / 2;
                appSprite.y = app.screen.height / 2;
                app.stage.addChild(appSprite);

                appSprite.texture.baseTexture.on('error', (error) => {
                    console.error('Error loading texture:', error);
                });
            };
            img.onerror = (error) => {
                console.error('Error loading image:', error);
            };
        }

        console.log('PixiJS application initialized successfully');
    })();
}