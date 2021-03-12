import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverContentComponent } from './components/popover-content/popover-content.component';
import { LayerModule } from '../layer/layer.module';
import { PopoverMenuComponent } from './components/popover-menu/popover-menu.component';
import { PopoverSelectComponent } from './components/popover-select/popover-select.component';
import { TooltipDirective, PopoverDirective, PopoverChipDirective, PopoverChipRemoveDirective, PopoverMenuDirective, PopoverMenuItemDirective, PopoverOptionDirective, PopoverRemoveOnClickDirective, } from './directives';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as i0 from "@angular/core";
export class PopoverModule {
}
PopoverModule.ɵmod = i0.ɵɵdefineNgModule({ type: PopoverModule });
PopoverModule.ɵinj = i0.ɵɵdefineInjector({ factory: function PopoverModule_Factory(t) { return new (t || PopoverModule)(); }, imports: [[CommonModule, BrowserAnimationsModule, LayerModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PopoverModule, { declarations: [PopoverDirective,
        PopoverMenuDirective,
        PopoverContentComponent,
        PopoverMenuItemDirective,
        PopoverMenuComponent,
        PopoverSelectComponent,
        PopoverChipDirective,
        PopoverChipRemoveDirective,
        PopoverRemoveOnClickDirective,
        PopoverOptionDirective,
        TooltipDirective], imports: [CommonModule, BrowserAnimationsModule, LayerModule], exports: [PopoverDirective,
        PopoverMenuDirective,
        PopoverMenuItemDirective,
        PopoverMenuComponent,
        PopoverSelectComponent,
        PopoverChipDirective,
        PopoverChipRemoveDirective,
        PopoverRemoveOnClickDirective,
        PopoverOptionDirective,
        TooltipDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    PopoverDirective,
                    PopoverMenuDirective,
                    PopoverContentComponent,
                    PopoverMenuItemDirective,
                    PopoverMenuComponent,
                    PopoverSelectComponent,
                    PopoverChipDirective,
                    PopoverChipRemoveDirective,
                    PopoverRemoveOnClickDirective,
                    PopoverOptionDirective,
                    TooltipDirective,
                ],
                imports: [CommonModule, BrowserAnimationsModule, LayerModule],
                exports: [
                    PopoverDirective,
                    PopoverMenuDirective,
                    PopoverMenuItemDirective,
                    PopoverMenuComponent,
                    PopoverSelectComponent,
                    PopoverChipDirective,
                    PopoverChipRemoveDirective,
                    PopoverRemoveOnClickDirective,
                    PopoverOptionDirective,
                    TooltipDirective,
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZm9sdGkvUHJvamVjdHMvbmctcG9wcHkvcHJvamVjdHMvbmctcG9wcHkvc3JjLyIsInNvdXJjZXMiOlsibGliL3BvcG92ZXIvcG9wb3Zlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDakcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLG9CQUFvQixFQUNwQiwwQkFBMEIsRUFDMUIsb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixzQkFBc0IsRUFDdEIsNkJBQTZCLEdBQzlCLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDOztBQThCN0UsTUFBTSxPQUFPLGFBQWE7O2lEQUFiLGFBQWE7eUdBQWIsYUFBYSxrQkFkZixDQUFDLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxXQUFXLENBQUM7d0ZBY2xELGFBQWEsbUJBMUJ0QixnQkFBZ0I7UUFDaEIsb0JBQW9CO1FBQ3BCLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixvQkFBb0I7UUFDcEIsMEJBQTBCO1FBQzFCLDZCQUE2QjtRQUM3QixzQkFBc0I7UUFDdEIsZ0JBQWdCLGFBRVIsWUFBWSxFQUFFLHVCQUF1QixFQUFFLFdBQVcsYUFFMUQsZ0JBQWdCO1FBQ2hCLG9CQUFvQjtRQUNwQix3QkFBd0I7UUFDeEIsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixvQkFBb0I7UUFDcEIsMEJBQTBCO1FBQzFCLDZCQUE2QjtRQUM3QixzQkFBc0I7UUFDdEIsZ0JBQWdCO2tEQUdQLGFBQWE7Y0E1QnpCLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osZ0JBQWdCO29CQUNoQixvQkFBb0I7b0JBQ3BCLHVCQUF1QjtvQkFDdkIsd0JBQXdCO29CQUN4QixvQkFBb0I7b0JBQ3BCLHNCQUFzQjtvQkFDdEIsb0JBQW9CO29CQUNwQiwwQkFBMEI7b0JBQzFCLDZCQUE2QjtvQkFDN0Isc0JBQXNCO29CQUN0QixnQkFBZ0I7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxXQUFXLENBQUM7Z0JBQzdELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7b0JBQ2hCLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUN4QixvQkFBb0I7b0JBQ3BCLHNCQUFzQjtvQkFDdEIsb0JBQW9CO29CQUNwQiwwQkFBMEI7b0JBQzFCLDZCQUE2QjtvQkFDN0Isc0JBQXNCO29CQUN0QixnQkFBZ0I7aUJBQ2pCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgUG9wb3ZlckNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlci1jb250ZW50L3BvcG92ZXItY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGF5ZXJNb2R1bGUgfSBmcm9tICcuLi9sYXllci9sYXllci5tb2R1bGUnO1xuaW1wb3J0IHsgUG9wb3Zlck1lbnVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcG9wb3Zlci1tZW51L3BvcG92ZXItbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wb3ZlclNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wb3BvdmVyLXNlbGVjdC9wb3BvdmVyLXNlbGVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgVG9vbHRpcERpcmVjdGl2ZSxcbiAgUG9wb3ZlckRpcmVjdGl2ZSxcbiAgUG9wb3ZlckNoaXBEaXJlY3RpdmUsXG4gIFBvcG92ZXJDaGlwUmVtb3ZlRGlyZWN0aXZlLFxuICBQb3BvdmVyTWVudURpcmVjdGl2ZSxcbiAgUG9wb3Zlck1lbnVJdGVtRGlyZWN0aXZlLFxuICBQb3BvdmVyT3B0aW9uRGlyZWN0aXZlLFxuICBQb3BvdmVyUmVtb3ZlT25DbGlja0RpcmVjdGl2ZSxcbn0gZnJvbSAnLi9kaXJlY3RpdmVzJztcbmltcG9ydCB7QnJvd3NlckFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFBvcG92ZXJEaXJlY3RpdmUsXG4gICAgUG9wb3Zlck1lbnVEaXJlY3RpdmUsXG4gICAgUG9wb3ZlckNvbnRlbnRDb21wb25lbnQsXG4gICAgUG9wb3Zlck1lbnVJdGVtRGlyZWN0aXZlLFxuICAgIFBvcG92ZXJNZW51Q29tcG9uZW50LFxuICAgIFBvcG92ZXJTZWxlY3RDb21wb25lbnQsXG4gICAgUG9wb3ZlckNoaXBEaXJlY3RpdmUsXG4gICAgUG9wb3ZlckNoaXBSZW1vdmVEaXJlY3RpdmUsXG4gICAgUG9wb3ZlclJlbW92ZU9uQ2xpY2tEaXJlY3RpdmUsXG4gICAgUG9wb3Zlck9wdGlvbkRpcmVjdGl2ZSxcbiAgICBUb29sdGlwRGlyZWN0aXZlLFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSwgTGF5ZXJNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgUG9wb3ZlckRpcmVjdGl2ZSxcbiAgICBQb3BvdmVyTWVudURpcmVjdGl2ZSxcbiAgICBQb3BvdmVyTWVudUl0ZW1EaXJlY3RpdmUsXG4gICAgUG9wb3Zlck1lbnVDb21wb25lbnQsXG4gICAgUG9wb3ZlclNlbGVjdENvbXBvbmVudCxcbiAgICBQb3BvdmVyQ2hpcERpcmVjdGl2ZSxcbiAgICBQb3BvdmVyQ2hpcFJlbW92ZURpcmVjdGl2ZSxcbiAgICBQb3BvdmVyUmVtb3ZlT25DbGlja0RpcmVjdGl2ZSxcbiAgICBQb3BvdmVyT3B0aW9uRGlyZWN0aXZlLFxuICAgIFRvb2x0aXBEaXJlY3RpdmUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJNb2R1bGUge31cbiJdfQ==