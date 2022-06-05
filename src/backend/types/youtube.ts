export interface YoutubeData {
  contents: Content[];
}

export interface Content {
  playlistVideoRenderer: PlaylistVideoRenderer;
}

export interface PlaylistVideoRenderer {
  videoId: string;
  thumbnail: Thumbnail;
  title: Title;
  index: Index;
  shortBylineText: ShortBylineText;
  lengthText: LengthText;
  navigationEndpoint: NavigationEndpoint2;
  lengthSeconds: string;
  trackingParams: string;
  isPlayable: boolean;
  menu: Menu;
  thumbnailOverlays: ThumbnailOverlay[];
}

export interface Thumbnail {
  thumbnails: Thumbnail2[];
}

export interface Thumbnail2 {
  url: string;
  width: number;
  height: number;
}

export interface Title {
  runs: Run[];
  accessibility: Accessibility;
}

export interface Run {
  text: string;
}

export interface Accessibility {
  accessibilityData: AccessibilityData;
}

export interface AccessibilityData {
  label: string;
}

export interface Index {
  simpleText: string;
}

export interface ShortBylineText {
  runs: Run2[];
}

export interface Run2 {
  text: string;
  navigationEndpoint: NavigationEndpoint;
}

export interface NavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata;
  browseEndpoint: BrowseEndpoint;
}

export interface CommandMetadata {
  webCommandMetadata: WebCommandMetadata;
}

export interface WebCommandMetadata {
  url: string;
  webPageType: string;
  rootVe: number;
  apiUrl: string;
}

export interface BrowseEndpoint {
  browseId: string;
  canonicalBaseUrl: string;
}

export interface LengthText {
  accessibility: Accessibility2;
  simpleText: string;
}

export interface Accessibility2 {
  accessibilityData: AccessibilityData2;
}

export interface AccessibilityData2 {
  label: string;
}

export interface NavigationEndpoint2 {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata2;
  watchEndpoint: WatchEndpoint;
}

export interface CommandMetadata2 {
  webCommandMetadata: WebCommandMetadata2;
}

export interface WebCommandMetadata2 {
  url: string;
  webPageType: string;
  rootVe: number;
}

export interface WatchEndpoint {
  videoId: string;
  playlistId: string;
  index: number;
  params: string;
  loggingContext: LoggingContext;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
}

export interface LoggingContext {
  vssLoggingContext: VssLoggingContext;
}

export interface VssLoggingContext {
  serializedContextData: string;
}

export interface WatchEndpointSupportedOnesieConfig {
  html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig;
}

export interface Html5PlaybackOnesieConfig {
  commonConfig: CommonConfig;
}

export interface CommonConfig {
  url: string;
}

export interface Menu {
  menuRenderer: MenuRenderer;
}

export interface MenuRenderer {
  items: Item[];
  trackingParams: string;
  accessibility: Accessibility3;
}

export interface Item {
  menuServiceItemRenderer: MenuServiceItemRenderer;
}

export interface MenuServiceItemRenderer {
  text: Text;
  icon: Icon;
  serviceEndpoint: ServiceEndpoint;
  trackingParams: string;
}

export interface Text {
  runs: Run3[];
}

export interface Run3 {
  text: string;
}

export interface Icon {
  iconType: string;
}

export interface ServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata3;
  signalServiceEndpoint: SignalServiceEndpoint;
}

export interface CommandMetadata3 {
  webCommandMetadata: WebCommandMetadata3;
}

export interface WebCommandMetadata3 {
  sendPost: boolean;
}

export interface SignalServiceEndpoint {
  signal: string;
  actions: Action[];
}

export interface Action {
  clickTrackingParams: string;
  addToPlaylistCommand: AddToPlaylistCommand;
}

export interface AddToPlaylistCommand {
  openMiniplayer: boolean;
  videoId: string;
  listType: string;
  onCreateListCommand: OnCreateListCommand;
  videoIds: string[];
}

export interface OnCreateListCommand {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata4;
  createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
}

export interface CommandMetadata4 {
  webCommandMetadata: WebCommandMetadata4;
}

export interface WebCommandMetadata4 {
  sendPost: boolean;
  apiUrl: string;
}

export interface CreatePlaylistServiceEndpoint {
  videoIds: string[];
  params: string;
}

export interface Accessibility3 {
  accessibilityData: AccessibilityData3;
}

export interface AccessibilityData3 {
  label: string;
}

export interface ThumbnailOverlay {
  thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer;
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
}

export interface ThumbnailOverlayTimeStatusRenderer {
  text: Text2;
  style: string;
}

export interface Text2 {
  accessibility: Accessibility4;
  simpleText: string;
}

export interface Accessibility4 {
  accessibilityData: AccessibilityData4;
}

export interface AccessibilityData4 {
  label: string;
}

export interface ThumbnailOverlayNowPlayingRenderer {
  text: Text3;
}

export interface Text3 {
  runs: Run4[];
}

export interface Run4 {
  text: string;
}
