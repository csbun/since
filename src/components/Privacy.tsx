import {Button, Card, Layout, Modal, Text} from '@ui-kitten/components';
import {useStorage} from '../context/Storage';
import {BackHandler, ScrollView, View} from 'react-native';

export default function Privacy(props: {visible?: boolean; setVisible?: (visible: boolean) => void}) {
  const {value: shown, setValue: setShown} = useStorage('privacy_shown', false);
  const visible = props.visible ?? !shown;

  return (
    <Modal
      visible={visible}
      backdropStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <Card
        disabled
        footer={() => (
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
            <Button
              style={{marginHorizontal: 10}}
              status="basic"
              onPress={() => {
                BackHandler.exitApp();
              }}>
              退出应用
            </Button>
            <Button
              onPress={() => {
                setShown(true);
                props.setVisible && props.setVisible(visible);
              }}>
              同意
            </Button>
          </View>
        )}>
        <PrivacyContent />
      </Card>
    </Modal>
  );
}

function H1(props: any) {
  return <Text category="h5">{props.children}</Text>;
}
function H2(props: any) {
  return <Text category="h6">{props.children}</Text>;
}
function P(props: any) {
  return <Text>{props.children}</Text>;
}

function PrivacyContent() {
  return (
    <ScrollView style={{height: 300}}>
      <H1>隐私声明</H1>
      <P>
        我们非常重视您的隐私和个人信息的保护。本隐私声明详细说明了当您使用我们的应用时，我们如何收集、使用、共享和保护您的个人信息。请您在使用我们的应用之前，仔细阅读以下隐私声明。
      </P>
      <H2>一、信息收集</H2>
      <P>设备信息：我们可能会收集关于您设备的信息，如设备型号、操作系统版本、IP地址等，以优化我们的应用性能和服务。</P>
      <P>
        使用数据：我们可能会记录您在使用应用时的行为数据，如访问的页面、搜索的关键词、点击的链接等，以改进我们的服务和用户体验。
      </P>
      <H2>二、信息使用</H2>
      <P>提供服务：我们会使用您提供的信息来为您提供所需的服务和功能。</P>
      <P>优化体验：我们会分析您的使用数据，以了解您的偏好和习惯，从而优化我们的应用和服务。</P>
      <P>推广营销：在征得您同意的前提下，我们可能会使用您的联系信息向您发送推广信息或进行营销活动。</P>
      <H2>三、信息共享</H2>
      <P>
        合作伙伴：我们可能会与合作伙伴共享您的信息，以便他们为您提供服务或进行营销活动。但我们会在合作协议中明确规定他们对您的信息的保护责任。
      </P>
      <P>法律要求：在法律法规要求的情况下，我们可能会向政府或执法机构提供您的信息。</P>
      <H2>四、信息安全</H2>
      <P>
        我们采取了合理的技术和管理措施来保护您的信息安全，包括但不限于数据加密、访问控制、安全审计等。但我们无法保证信息在互联网传输过程中的绝对安全，请您在使用我们的应用时保持警惕。
      </P>
      <H2>五、您的权利</H2>
      <P>访问和修改：您有权访问和修改您提供的个人信息。</P>
      <P>删除：在符合法律法规和我们的政策的前提下，您有权要求删除您的个人信息。</P>
      <P>拒绝：您有权拒绝我们收集或使用您的个人信息，但这可能会影响您使用我们的应用或服务。</P>
      <H2>六、变更通知</H2>
      <P>
        我们可能会根据法律法规的变化或业务发展的需要，对本隐私声明进行修订。当隐私声明发生变更时，我们会通过应用内通知或其他方式告知您。请您定期查看本隐私声明，以确保您了解我们的最新隐私政策。
      </P>
      <H2>七、适用范围</H2>
      <P>本隐私声明仅适用于我们的应用。当您通过我们的应用链接到其他网站或服务时，请仔细阅读他们的隐私政策。</P>
      <H2>八、最后条款</H2>
      <P>
        本隐私声明自发布之日起生效。如有任何争议，双方应首先通过友好协商解决；协商不成的，任何一方均有权向有管辖权的人民法院提起诉讼。
      </P>
    </ScrollView>
  );
}
