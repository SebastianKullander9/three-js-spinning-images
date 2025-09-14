async function getImages() {
    const imageUrls: string[] = [];

    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=50&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    data.articles.map((obj: { urlToImage: string }) => {
        imageUrls.push(obj.urlToImage);
    });

    console.log(imageUrls)
    return imageUrls;
}

export default getImages;