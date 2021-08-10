import Base from '../Base';
import { SessionContext } from '../Session';
export interface SceneSessionData {
    current?: string;
}
export interface SceneSession<S extends SceneSessionData = SceneSessionData> {
    __scenes: S;
}
export default class SceneContext<C extends SessionContext<SceneSession<D>>, D extends SceneSessionData = SceneSessionData> {
    private ctx;
    private scenes;
    constructor(ctx: C, scenes: Map<string, Base<C>>);
    get session(): D;
    get current(): Base<C>;
    reset(): void;
    enter(sceneId: string): Promise<void>;
    private leaving;
    leave(): Promise<void>;
}
