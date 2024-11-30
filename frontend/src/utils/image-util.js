

const getImgUrl = (name) => {
    console.log(name);

    // Check if name is valid
    if (!name) {
        console.error('Error: Invalid name');
        return;
    }

    try {
        let img_url = new URL(`../assets/uploads/${name}`, import.meta.url).href;
        console.log(img_url);
    } catch (error) {
        console.error('Error getting image URL:', error);
    }
}


export {getImgUrl}