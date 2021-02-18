import { SessionContext } from '@src/Session';
import Base from '@src/Base';
export interface SceneSessionData {
    current?: string;
}
export interface SceneSession<S extends SceneSessionData = SceneSessionData> {
    __scenes: S;
}
declare class SceneContext<C extends SessionContext<SceneSession<D>>, D extends SceneSessionData = SceneSessionData> {
    private readonly ctx;
    private readonly scenes;
    constructor(ctx: C, scenes: Map<string, Base<C>>);
    get session(): D;
    get current(): Base<C>;
    reset(): void;
    enter(sceneId: string): Promise<unknown>;
    private leaving;
    leave(): Promise<void>;
}
export default SceneContext;
