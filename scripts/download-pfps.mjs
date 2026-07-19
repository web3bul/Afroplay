import https from 'https';
import fs from 'fs';
import path from 'path';

const guestPfps = {
  "airbillspay": "https://pbs.twimg.com/profile_images/2026257161584599040/-ikcKY1u_400x400.jpg",
  "findy_dev": "https://pbs.twimg.com/profile_images/1983499698653593600/JMnAKuAP_400x400.jpg",
  "0xchef": "https://pbs.twimg.com/profile_images/2065399808689328128/Ttbz9a3o_400x400.jpg",
  "mtchy": "https://pbs.twimg.com/profile_images/1879119228604669952/BDzcMyZk_400x400.jpg",
  "israel_igboze": "https://pbs.twimg.com/profile_images/2039420717855297537/bFKjVht3_400x400.jpg",
  "mrboqer": "https://pbs.twimg.com/profile_images/1741212783155232768/azz30qNR_400x400.jpg",
  "w1nszn": "https://pbs.twimg.com/profile_images/2046369001895522304/JeRQEBfr_400x400.jpg",
  "prosper_ayere": "https://pbs.twimg.com/profile_images/1821129492540145664/iK96wKBP_400x400.jpg",
  "blockchain_josh": "https://pbs.twimg.com/profile_images/2034382013575344128/aJpSTujU_400x400.jpg",
  "tobi_builder": "https://pbs.twimg.com/profile_images/2047421691391881217/SwThLpkN_400x400.jpg",
  "atoyebi_olawale": "https://pbs.twimg.com/profile_images/1661453508489404416/GYSPIxap_400x400.jpg",
  "sarah_wahinya": "https://pbs.twimg.com/profile_images/1899073393443344384/xKWiTBiQ_400x400.jpg",
  "monipay": "https://pbs.twimg.com/profile_images/2041704432258498560/uEtXZJHQ_400x400.jpg",
  "headlineodds": "https://pbs.twimg.com/profile_images/2019368984617865216/6FpUmAnq_400x400.jpg",
  "payfrica": "https://pbs.twimg.com/profile_images/2068828376639426561/viVPsbid_400x400.jpg",
  "sol_pollinet": "https://pbs.twimg.com/profile_images/2046627230747389954/a_vuAb1g_400x400.jpg",
  "clapmihq": "https://pbs.twimg.com/profile_images/1955658706793738246/aTRvLXey_400x400.jpg",
  "giddycodes": "https://pbs.twimg.com/profile_images/1820534953873911809/mx3Bm5z7_400x400.jpg"
};

const outDir = path.join(process.cwd(), 'public', 'guests');
fs.mkdirSync(outDir, { recursive: true });

function download(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(outDir, filename);
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        download(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); console.log(`Downloaded: ${filename}`); resolve(); });
    }).on('error', (err) => { fs.unlink(filePath, () => {}); reject(err); });
  });
}

async function main() {
  console.log(`Downloading ${Object.keys(guestPfps).length} guest PFPs to ${outDir}...`);
  for (const [name, url] of Object.entries(guestPfps)) {
    try {
      await download(url, `${name}.jpg`);
    } catch (err) {
      console.error(`Failed to download ${name}: ${err.message}`);
    }
  }
  console.log('Done!');
}

main();
