
export interface Location {
    id : number;
    name: string;
    type : string;
    dimesion: string;
    resident: string[];
    url: string;
}

export interface PangeInfo {
    count : number;
    pages : number;
    next : string | null;
    prev : string | null;
}