import { courseItemName, courseRequestLink, courseRow, type OfficialCourse, type OfficialVendor } from '../../../content/officialLabs';
import { requestLink } from '../../../content/requestTypes';
import { site } from '../../../content/site';
import { ButtonLink } from '../../ui/Button';
import { Chip } from '../../ui/Chip';
import { LinkArrow } from '../../ui/LinkArrow';
import { RevealGroup, RevealItem } from '../../ui/Reveal';
import { Section, SectionIntro, type Tone } from '../../ui/Section';
import { SmartLink } from '../../ui/SmartLink';
import { accentWord } from './accentWord';

/** Word in each vendor's heading that gets the gradient accent. */
const accentFor: Record<OfficialVendor['id'], string> = { azure: 'Azure', aws: 'AWS' };

/**
 * One course as a small card. On the canvas it is a white card; on a white
 * section it starts canvas-coloured and turns white as it lifts on hover.
 */
function CourseCard({ vendor, course, onWhite }: { vendor: OfficialVendor; course: OfficialCourse; onWhite: boolean }) {
  const item = courseItemName(course);
  const shell = onWhite
    ? 'relative rounded-card bg-canvas card-hover hover:bg-white focus-within:bg-white'
    : 'card card-hover';
  return (
    <article className={`${shell} group flex h-full flex-col p-4 transition-colors sm:p-6`}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        {course.code ? (
          <Chip className="font-mono">{course.code}</Chip>
        ) : (
          <Chip tone={onWhite ? 'dark' : 'soft'}>{course.area}</Chip>
        )}
        {course.exam ? (
          <span className="font-mono text-micro text-muted">
            {courseRow.examLabel} {course.exam}
          </span>
        ) : null}
      </div>
      <h4 className="mt-3 text-base leading-snug font-medium tracking-tight sm:text-[1.0625rem]">{course.name}</h4>
      <div className="mt-auto pt-3 sm:pt-5">
        <LinkArrow href={courseRequestLink(vendor, course)} stretched>
          {courseRow.requestLabel}
          <span className="sr-only">: {item}</span>
        </LinkArrow>
      </div>
    </article>
  );
}

/**
 * One vendor's course list: an intro row (heading left, offer + request button
 * right), then courses grouped by level as cards that lift on hover.
 */
export function VendorCourses({ vendor, tone }: { vendor: OfficialVendor; tone: Tone }) {
  const titleId = `${vendor.id}-title`;
  const onWhite = tone === 'white';
  const groups = vendor.levels
    .map((level) => ({
      ...level,
      courses: vendor.courses.filter((c) => c.level === level.id),
    }))
    .filter((g) => g.courses.length > 0);

  return (
    <Section tone={tone} id={vendor.id} labelledBy={titleId}>
      <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
        <SectionIntro
          id={titleId}
          align="left"
          eyebrow={vendor.eyebrow}
          title={accentWord(vendor.title, accentFor[vendor.id])}
          intro={vendor.intro}
          className="col-span-12 lg:col-span-8"
        />
        <div className="col-span-12 flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <Chip tone="accent">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              {site.offer.short}
            </Chip>
            <Chip tone="soft" className={onWhite ? '' : 'bg-white'}>
              {courseRow.countLabel(vendor.courses.length)}
            </Chip>
          </div>
          <ButtonLink href={requestLink(vendor.requestType)} variant="dark" arrow="up-right">
            {vendor.requestAllLabel}
          </ButtonLink>
        </div>
      </div>

      <div className="mt-14">
        {groups.map((group, gi) => {
          const groupId = `${vendor.id}-${group.id}`;
          return (
            <div
              key={group.id}
              className={`grid gap-x-10 gap-y-5 lg:grid-cols-[12rem_1fr] ${gi > 0 ? 'mt-10 border-t border-line-strong pt-10' : ''}`}
            >
              <div className="flex items-baseline gap-3 lg:sticky lg:top-28 lg:block lg:self-start">
                <span aria-hidden="true" className="font-mono text-micro text-muted">
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <h3 id={groupId} className="text-h3 lg:mt-3 lg:text-2xl lg:font-normal lg:tracking-tight">
                  {group.label}
                </h3>
                <p className="ml-auto font-mono text-micro text-muted lg:mt-2 lg:ml-0">
                  {courseRow.countLabel(group.courses.length)}
                </p>
              </div>
              <RevealGroup
                as="ul"
                aria-labelledby={groupId}
                className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3"
              >
                {group.courses.map((course) => (
                  <RevealItem as="li" key={courseItemName(course)}>
                    <CourseCard vendor={vendor} course={course} onWhite={onWhite} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          );
        })}
      </div>

      <p className="mt-12 text-center text-sm text-body">
        {courseRow.missing.text}{' '}
        <SmartLink href={requestLink(vendor.requestType)} className="link-underline font-medium">
          {courseRow.missing.linkLabel}
        </SmartLink>
        .
      </p>
    </Section>
  );
}
