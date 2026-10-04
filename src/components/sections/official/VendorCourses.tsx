import { ArrowRight } from 'lucide-react';
import { courseItemName, courseRequestLink, courseRow, type OfficialVendor } from '../../../content/officialLabs';
import { requestLink } from '../../../content/requestTypes';
import { site } from '../../../content/site';
import { ButtonLink } from '../../ui/Button';
import { Eyebrow, Section, type Tone } from '../../ui/Section';
import { SmartLink } from '../../ui/SmartLink';
import { Reveal } from '../../ui/Reveal';

/**
 * One vendor's course list: sticky intro on the left, courses grouped by
 * level on the right. Rows stack to two lines on phones.
 */
export function VendorCourses({ vendor, tone }: { vendor: OfficialVendor; tone: Tone }) {
  const titleId = `${vendor.id}-title`;
  const groups = vendor.levels
    .map((level) => ({
      ...level,
      courses: vendor.courses.filter((c) => c.level === level.id),
    }))
    .filter((g) => g.courses.length > 0);

  return (
    <Section tone={tone} id={vendor.id} labelledBy={titleId}>
      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <Eyebrow>{vendor.eyebrow}</Eyebrow>
            <h2 id={titleId} className="mt-5 text-h2">
              {vendor.title}
            </h2>
            <p className="mt-5 text-body">{vendor.intro}</p>

            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 font-mono text-micro text-heading">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              {site.offer.short}
            </p>

            <p className="mt-6 font-mono text-micro text-muted">
              {courseRow.countLabel(vendor.courses.length)} · {groups.map((g) => g.label).join(' / ')}
            </p>

            <ButtonLink href={requestLink(vendor.requestType)} variant="secondary" className="mt-6">
              {vendor.requestAllLabel}
            </ButtonLink>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          {/* Column labels (visual only; each row is read as one line) */}
          <div
            aria-hidden="true"
            className="hidden grid-cols-12 gap-x-4 pb-3 font-mono text-micro text-muted uppercase sm:grid"
          >
            <span className="col-span-3">{vendor.firstColumn}</span>
            <span className="col-span-6">{courseRow.columns.course}</span>
            <span className="col-span-3 text-right">{courseRow.columns.request}</span>
          </div>

          <div className="space-y-10 sm:mt-2">
            {groups.map((group) => (
              <Reveal key={group.id}>
                <div className="flex items-baseline justify-between gap-4 border-b border-line-strong pb-3">
                  <h3 className="text-h3">{group.label}</h3>
                  <p className="font-mono text-micro text-muted">{courseRow.countLabel(group.courses.length)}</p>
                </div>
                <ul>
                  {group.courses.map((course) => {
                    const item = courseItemName(course);
                    return (
                      <li
                        key={item}
                        className="grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-b border-line py-3.5"
                      >
                        <span
                          className={`col-span-12 flex flex-wrap items-baseline gap-x-2 font-mono text-sm break-words sm:col-span-3 sm:flex-col ${
                            course.code ? 'text-heading' : 'text-muted'
                          }`}
                        >
                          <span>{course.code ?? course.area}</span>
                          {course.exam && (
                            <span className="text-micro text-muted">
                              {courseRow.examLabel} {course.exam}
                            </span>
                          )}
                        </span>
                        <span className="col-span-8 min-w-0 text-heading break-words sm:col-span-6">{course.name}</span>
                        <SmartLink
                          href={courseRequestLink(vendor, course)}
                          className="link col-span-4 inline-flex items-center justify-self-end gap-1 text-sm font-medium sm:col-span-3"
                        >
                          {courseRow.requestLabel}
                          <span className="sr-only">: {item}</span>
                          <ArrowRight className="h-4 w-4 flex-none" strokeWidth={1.5} aria-hidden="true" />
                        </SmartLink>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-sm text-body">
            {courseRow.missing.text}{' '}
            <SmartLink href={requestLink(vendor.requestType)} className="link font-medium">
              {courseRow.missing.linkLabel}
            </SmartLink>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
