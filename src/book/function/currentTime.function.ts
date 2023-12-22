export function getCurrentTime(): string {
    const now = new Date();
    const currentTime =
        now.toISOString().slice(0, 10) +
        `/${now.getHours()}:${now.getMinutes()}`;

    return currentTime;
}
