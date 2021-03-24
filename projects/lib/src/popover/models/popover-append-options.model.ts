import { IPopoverAppendOptions, PopoverTrigger, PopoverType } from '../popover.interface';

export class PopoverAppendOptions {
  type: PopoverType;
  triggeredBy: PopoverTrigger;
  closeOnScroll: boolean;
  delayClose: number;
  closeOnTriggerAgain: boolean;
  hideOnScroll: boolean;
  stickyToTrigger: boolean;

  constructor(options: IPopoverAppendOptions) {
    this.type = options.type;
    this.triggeredBy = options.triggeredBy || 'click';
    this.closeOnScroll = options.closeOnScroll !== undefined ? options.closeOnScroll : true;
    this.delayClose = Number.isInteger(options.delayClose) ? options.delayClose : null;
    this.closeOnTriggerAgain = !!options.closeOnTriggerAgain;
    this.hideOnScroll = !!options.hideOnScroll;
    this.stickyToTrigger = !!options.stickyToTrigger;
  }
}
