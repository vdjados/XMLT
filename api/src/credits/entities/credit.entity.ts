export class Credit {
    id: number;
    src: string;
    creditTitle: string;
    creditText: string;
    comments?: Array<{
        id: number;
        text: string;
        date: string;
    }>;
}