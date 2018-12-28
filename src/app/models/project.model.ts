import { Style } from './style.model';
import { Citation } from './citation.model';
export interface Project {
    title: string,
    id: string,
    citations: Citation[],
    style: Style
}