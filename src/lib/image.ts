export const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    })
}

export const toBase64Array = async (files: File[]) => {
    return await Promise.all(
        files.map(async (file) => {
            return await toBase64(file);
        })
    )
}