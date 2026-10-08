// Analytics Service - Analytics configuration and code generation
import type { Project } from '../../types';
import { getProject, saveProject } from '../../storage/BrowserStorage';

export class AnalyticsService {
  async getAnalyticsConfig(projectId: string): Promise<Project['settings']['analytics']> {
    const project = getProject(projectId);
    return project?.settings.analytics || {};
  }

  async updateAnalyticsConfig(projectId: string, analytics: Partial<Project['settings']['analytics']>): Promise<void> {
    const project = getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedProject: Project = {
      ...project,
      settings: {
        ...project.settings,
        analytics: {
          ...project.settings.analytics,
          ...analytics,
        },
      },
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
  }

  generateGoogleAnalyticsCode(measurementId: string): string {
    return `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${measurementId}');
</script>`;
  }

  generateGoogleTagManagerCode(containerId: string): { head: string; body: string } {
    return {
      head: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');</script>`,
      body: `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
    };
  }

  generateMetaPixelCode(pixelId: string): string {
    return `<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
</script>`;
  }

  async generateAllTrackingCode(projectId: string): Promise<{ head: string; body: string }> {
    const config = await this.getAnalyticsConfig(projectId);
    const headScripts: string[] = [];
    const bodyScripts: string[] = [];

    if (config.googleTagManagerId) {
      const gtmCode = this.generateGoogleTagManagerCode(config.googleTagManagerId);
      headScripts.push(gtmCode.head);
      bodyScripts.push(gtmCode.body);
    }

    if (config.googleAnalyticsId) {
      headScripts.push(this.generateGoogleAnalyticsCode(config.googleAnalyticsId));
    }

    if (config.metaPixelId) {
      headScripts.push(this.generateMetaPixelCode(config.metaPixelId));
    }

    if (config.customScripts) {
      headScripts.push(`<!-- Custom Scripts -->\n${config.customScripts}`);
    }

    return {
      head: headScripts.join('\n\n'),
      body: bodyScripts.join('\n\n'),
    };
  }

  validateConfig(config: Project['settings']['analytics']): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (config.googleAnalyticsId && !config.googleAnalyticsId.startsWith('G-')) {
      errors.push('Google Analytics ID must start with "G-"');
    }

    if (config.googleTagManagerId && !config.googleTagManagerId.startsWith('GTM-')) {
      errors.push('Google Tag Manager ID must start with "GTM-"');
    }

    if (config.metaPixelId && !/^\d+$/.test(config.metaPixelId)) {
      errors.push('Meta Pixel ID must be numeric');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export const analyticsService = new AnalyticsService();
