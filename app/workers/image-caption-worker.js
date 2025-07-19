import { pipeline } from '@xenova/transformers';

class ImageCaptioningPipeline {
  static task = 'image-to-text';
  static model = 'Xenova/vit-gpt2-image-captioning';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
  let captioner = await ImageCaptioningPipeline.getInstance(x => {
    self.postMessage({ status: 'loading', ...x });
  });
  self.postMessage({ status: 'ready' });

  let output = await captioner(event.data.image);
  self.postMessage({ status: 'complete', output });
});
