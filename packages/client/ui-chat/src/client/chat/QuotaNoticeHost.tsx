/**
 * The frame-wide `shell.overlay` host for quota notices. It holds the one live
 * notice for the whole app, so leaving the Chat panel does not drop it. A
 * `shell.quota-notice` entry may replace the generic Toast for codes it claims.
 */
import { Fragment } from 'react'
import { IconWarningOutlineRegular, Toast } from '@deepseek-ai/dsh-client-ui-primitives'
import type { QuotaNoticeHostProps, QuotaNoticeOwnerProps } from '../contract/slots.ts'

/**
 * @param props - the live notice, its dismissal, the chain outlet, and the locale seat.
 * @returns the notice on display, or null while none is live.
 */
export function QuotaNoticeHost({ useNotice, dismissNotice, keepNoticeOpen, renderSlotChain, t }: QuotaNoticeHostProps) {
  const notice = useNotice(current => current)
  if (notice === null) return null
  const owner: QuotaNoticeOwnerProps = {
    code: notice.code, message: t('message.failure.quota'), dismiss: dismissNotice, keepOpen: keepNoticeOpen,
  }
  return (
    <Fragment key={`quota-notice-${String(notice.seq)}`}>
      {renderSlotChain('shell.quota-notice', owner, {
        // The quota copy now names the billing fix, so hold the banner long
        // enough to read it; the toast hold otherwise defaults to 3s.
        fallback: <Toast text={owner.message} icon={<IconWarningOutlineRegular size={18} />} holdMs={6000} onDone={dismissNotice} />,
      })}
    </Fragment>
  )
}
